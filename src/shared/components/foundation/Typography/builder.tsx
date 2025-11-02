import clsx from 'clsx';
import { Skeleton } from '@/shared/components/content';
import { TypographyType } from './shared';

interface TypographyBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  type:      TypographyType;
  width?:    number;
  markdown?: boolean;
  nowrap?:   boolean;
}

const typographyVariants = {
  [TypographyType.TITLE]:    'text-title',
  [TypographyType.BODY]:     'text-body',
  [TypographyType.LABEL]:    'text-label',
  [TypographyType.FOOTNOTE]: 'text-footnote',
};

const typographyWeights = {
  [TypographyType.TITLE]:    'font-title',
  [TypographyType.BODY]:     'font-body',
  [TypographyType.LABEL]:    'font-label',
  [TypographyType.FOOTNOTE]: 'font-footnote',
};

const typographyHeights: Record<TypographyType, number> = {
  [TypographyType.TITLE]:    24,
  [TypographyType.BODY]:     16,
  [TypographyType.LABEL]:    14,
  [TypographyType.FOOTNOTE]: 12,
};

interface InlineMatch {
  start:    number;
  end:      number;
  type:     string;
  content?: string;
  url?:     string;
  alt?:     string;
  level?:   number;
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const matches: InlineMatch[] = [];  // Bold: **text** or __text__
  const boldRegex = /(\*\*|__)(.*?)\1/g;  // Strikethrough: ~~text~~
  const strikethroughRegex = /~~(.*?)~~/g;  // Code: `code`
  const codeRegex = /`([^`]+)`/g;  // Link: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;  // Image: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;  // Italic: *text* or _text_
  const italicRegex = /(?<!\*)\*(?!\*)(.*?)\*(?!\*)|(?<!_)_(?!_)(.*?)_(?!_)/g;

  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    matches.push({
      start:   match.index,
      end:     match.index + match[0].length,
      type:    'bold',
      content: match[2],
    });
  }

  boldRegex.lastIndex = 0;

  while ((match = strikethroughRegex.exec(text)) !== null) {
    matches.push({
      start:   match.index,
      end:     match.index + match[0].length,
      type:    'strikethrough',
      content: match[1],
    });
  }

  strikethroughRegex.lastIndex = 0;

  while ((match = codeRegex.exec(text)) !== null) {
    matches.push({
      start:   match.index,
      end:     match.index + match[0].length,
      type:    'code',
      content: match[1],
    });
  }

  codeRegex.lastIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    matches.push({
      start:   match.index,
      end:     match.index + match[0].length,
      type:    'link',
      content: match[1],
      url:     match[2],
    });
  }

  linkRegex.lastIndex = 0;

  while ((match = imageRegex.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end:   match.index + match[0].length,
      type:  'image',
      alt:   match[1],
      url:   match[2],
    });
  }

  imageRegex.lastIndex = 0;

  while ((match = italicRegex.exec(text)) !== null) {
    const italicContent = match[1] || match[2];
    const italicStart = match.index;
    const italicEnd = match.index + match[0].length;    // Check if this italic is inside a code block
    const isInsideCode = matches.some(m => m.type === 'code' && italicStart >= m.start && italicEnd <= m.end);

    if (!isInsideCode) {
      matches.push({
        start:   italicStart,
        end:     italicEnd,
        type:    'italic',
        content: italicContent,
      });
    }
  }

  italicRegex.lastIndex = 0;

  matches.sort((a, b) => a.start - b.start);

  const filteredMatches: InlineMatch[] = [];

  for (const match of matches) {
    const overlaps = filteredMatches.some(m => match.start < m.end && match.end > m.start);

    if (!overlaps) {
      filteredMatches.push(match);
    }
  }

  let currentIndex = 0;

  for (const match of filteredMatches) {
    if (match.start > currentIndex) {
      const beforeText = text.slice(currentIndex, match.start);

      if (beforeText) {
        parts.push(beforeText);
      }
    }

    switch (match.type) {
      case 'bold':
        parts.push(<strong key={`bold-${match.start}`} className='font-semibold'>{match.content}</strong>);

        break;

      case 'italic':
        parts.push(<em key={`italic-${match.start}`} className='italic'>{match.content}</em>);

        break;

      case 'strikethrough':
        parts.push(<del key={`strikethrough-${match.start}`} className='line-through'>{match.content}</del>);

        break;

      case 'code':
        parts.push(<code
          key={`code-${match.start}`}
          className='bg-grayscale-700 px-1 py-0.5 rounded text-grayscale-100 font-mono text-[0.9em]'
        >
          {match.content}
        </code>);

        break;

      case 'link':
        parts.push(<a
          key={`link-${match.start}`}
          href={match.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-400 hover:text-blue-300 underline'
        >
          {match.content}
        </a>);

        break;

      case 'image':
        parts.push(<img
          key={`image-${match.start}`}
          src={match.url}
          alt={match.alt || ''}
          className='max-w-full h-auto rounded'
        />);

        break;
    }

    currentIndex = match.end;
  }

  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function parseMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push(<pre
          key={`codeblock-${codeBlockKey}`}
          className='bg-grayscale-800 p-4 rounded-lg overflow-x-auto my-2'
        >
          <code className='text-grayscale-100 font-mono text-sm'>{codeBlockContent.join('\n')}</code>
        </pre>);

        codeBlockContent = [];

        codeBlockKey++;

        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }

      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);

      continue;
    }

    // Horizontal rule: ---, ***, ___
    if ((/^[-*_]{3,}$/).test(trimmedLine)) {
      blocks.push(<hr key={`hr-${i}`} className='border-grayscale-700 my-4' />);

      continue;
    }

    const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);

    if (headerMatch) {
      const level = headerMatch[1].length;
      const headerText = headerMatch[2];

      const headerClasses = [
        'font-bold text-grayscale-100',
        level === 1 ? 'text-2xl mt-6 mb-4' : '',
        level === 2 ? 'text-xl mt-5 mb-3' : '',
        level === 3 ? 'text-lg mt-4 mb-2' : '',
        level === 4 ? 'text-base mt-3 mb-2' : '',
        level === 5 ? 'text-sm mt-2 mb-1' : '',
        level === 6 ? 'text-xs mt-2 mb-1' : '',
      ].filter(Boolean).join(' ');

      blocks.push(<div
        key={`header-${i}`}
        className={headerClasses}
      >
        {parseInlineMarkdown(headerText)}
      </div>);

      continue;
    }

    // Blockquote: > quote
    if (trimmedLine.startsWith('>')) {
      const quoteText = trimmedLine.slice(1).trim();

      blocks.push(<blockquote
        key={`quote-${i}`}
        className='border-l-4 border-grayscale-600 pl-4 my-2 text-grayscale-300 italic'
      >
        {parseInlineMarkdown(quoteText)}
      </blockquote>);

      continue;
    }

    if ((/^[-*]\s+/).test(trimmedLine)) {
      const listItems: React.ReactNode[] = [];

      let j = i;

      while (j < lines.length && (/^[-*]\s+/).test(lines[j].trim())) {
        const itemText = lines[j].trim().slice(2);

        listItems.push(<li key={`ul-${j}`} className='ml-4 list-disc'>{parseInlineMarkdown(itemText)}</li>);

        j++;
      }

      blocks.push(<ul key={`ul-${i}`} className='my-2 ml-4'>{listItems}</ul>);

      i = j - 1;

      continue;
    }

    if ((/^\d+\.\s+/).test(trimmedLine)) {
      const listItems: React.ReactNode[] = [];

      let j = i;

      while (j < lines.length && (/^\d+\.\s+/).test(lines[j].trim())) {
        const itemText = lines[j].trim().replace(/^\d+\.\s+/, '');

        listItems.push(<li key={`ol-${j}`} className='ml-4 list-decimal'>{parseInlineMarkdown(itemText)}</li>);

        j++;
      }

      blocks.push(<ol key={`ol-${i}`} className='my-2 ml-4'>{listItems}</ol>);

      i = j - 1;

      continue;
    }

    // Paragraph
    if (trimmedLine) {
      blocks.push(<p key={`p-${i}`} className='my-2'>{parseInlineMarkdown(trimmedLine)}</p>);
    } else {
      blocks.push(<br key={`br-${i}`} />);
    }
  }

  if (inCodeBlock) {
    blocks.push(<pre
      key={`codeblock-${codeBlockKey}`}
      className='bg-grayscale-800 p-4 rounded-lg overflow-x-auto my-2'
    >
      <code className='text-grayscale-100 font-mono text-sm'>{codeBlockContent.join('\n')}</code>
    </pre>);
  }

  return <>{blocks}</>;
}

export function TypographyBuilder(props: TypographyBuilderProps) {
  const {
    children,
    type,
    className,
    width,
    markdown = false,
    nowrap = false,
    ...rest
  } = props;

  if (width && (children === undefined || children === null)) {
    return (
      <Skeleton
        width={width}
        height={typographyHeights[type]}
        className={clsx(typographyVariants[type], typographyWeights[type], className, 'rounded-[12px]')}
      />
    );
  }

  const content = markdown && typeof children === 'string'
    ? parseMarkdown(children)
    : children;

  return (
    <div
      className={clsx(
        typographyVariants[type], typographyWeights[type], 'tracking-[-0.04em] leading-[140%] font-pretendard text-grayscale-100', nowrap && 'whitespace-nowrap', className,
      )}
      {...rest}
    >
      {content}
    </div>
  );
}
