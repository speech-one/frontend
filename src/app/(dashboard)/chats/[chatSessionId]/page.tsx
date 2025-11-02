'use client';

import { motion } from 'framer-motion';
import { IconName } from 'lucide-react/dynamic';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Icon, Typography } from '@/shared/components/foundation';
import { AnimatedVStack, HStack, VStack } from '@/shared/components/layout';
import { ChatInput } from '@/widgets/chat';

interface ChatData {
  id:             string;
  content:        string;
  role:           'USER' | 'AGENT';
  agentResponse?: {
    subTasks: {
      title:   string;
      status:  'PENDING' | 'COMPLETED';
      sources: {
        sourceType:  'ACTION' | 'TEXT';
        action?:     ToolType;
        content?:    string;
        parameters?: string[];
      }[];
    }[];
  };
}

type ToolType = 'searchApi' | 'searchBrowser' | 'scrollUp' | 'scrollDown' | 'clickElement' | 'createFile' | 'writeFile' | 'readFile' | 'deleteFile';

const toolConfig: Record<ToolType, {
  icon:        IconName;
  description: string;
}> = {
  searchApi: {
    icon:        'search',
    description: '검색 중',
  },
  searchBrowser: {
    icon:        'compass',
    description: '검색 중',
  },
  scrollUp: {
    icon:        'arrow-up',
    description: '위로 스크롤 중',
  },
  scrollDown: {
    icon:        'arrow-down',
    description: '아래로 스크롤 중',
  },
  clickElement: {
    icon:        'mouse-pointer-2',
    description: '요소를 클릭하는 중',
  },
  createFile: {
    icon:        'file-plus',
    description: '파일을 생성하는 중',
  },
  writeFile: {
    icon:        'file-text',
    description: '파일을 작성하는 중',
  },
  readFile: {
    icon:        'file-text',
    description: '파일을 읽는 중',
  },
  deleteFile: {
    icon:        'file-minus',
    description: '파일을 삭제하는 중',
  },
};

const chatData: ChatData[] = [
  {
    id:      '1',
    role:    'USER',
    content: '다양한 측면으로 까줘',
  },
  {
    id:      '2',
    role:    'AGENT',
    content: `# 마크다운 테스트 가이드

이 문서는 다양한 마크다운 기능을 테스트하기 위한 예시입니다.

## 헤딩 레벨

### 3단계 헤딩
#### 4단계 헤딩
##### 5단계 헤딩
###### 6단계 헤딩

## 텍스트 스타일링

**굵은 글씨**와 *이탤릭* 그리고 ***굵은 이탤릭***을 사용할 수 있습니다.
또한 ~~취소선~~과 \`인라인 코드\`도 지원합니다.

> 이것은 인용구입니다. 중요한 내용을 강조할 때 사용할 수 있습니다.
> 여러 줄로 작성할 수도 있습니다.

## 리스트

### 순서 없는 리스트

- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목 1
  - 중첩된 항목 2
- 세 번째 항목

### 순서 있는 리스트

1. 첫 번째 작업
2. 두 번째 작업
3. 세 번째 작업
   1. 세부 작업 1
   2. 세부 작업 2

## 코드 블록

인라인 코드: \`const example = "test"\`

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("마크다운"));
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## 링크와 이미지

[구글](https://www.google.com)로 이동하거나 [GitHub](https://github.com)를 방문할 수 있습니다.

![예시 이미지](https://via.placeholder.com/400x200)

## 수평선

---

## 실제 사용 예시

네 알겠습니다. **교육, 운영, 진로 등 다양한 측면에서 비판적인 관점**을 담아 프레젠테이션을 구성하겠습니다.

현재 1단계인 **선린인터넷고등학교에 대한 정보 수집 및 분석**을 진행 중입니다. 다양한 비판적 관점을 도출하기 위해 학교의 현황, 교육 과정, 학생들의 평가 등 광범위한 정보를 수집하겠습니다.

### 주요 작업 항목

1. **정보 수집**
   - 웹 검색 및 크롤링
   - 문서 분석
   - 데이터 정제

2. **분석 및 검증**
   - 데이터 크로스 체크
   - 신뢰성 평가
   - 결론 도출

3. **콘텐츠 작성**
   - 슬라이드 구성
   - 시각화 자료 제작
   - 최종 검토

정보 수집 후, 2단계인 **비판적 관점의 슬라이드 콘텐츠 작성** 단계로 넘어가겠습니다. 잠시만 기다려주십시오.

> 참고: 모든 작업은 자동화된 프로세스를 통해 진행되며, 각 단계마다 검증 절차를 거칩니다.`,
    agentResponse: { subTasks: [
      {
        title:   '선린인터넷고등학교에 대한 정보 수집 및 분석',
        status:  'PENDING',
        sources: [
          {
            sourceType: 'ACTION',
            action:     'searchApi',
            parameters: [
              '선린인터넷고등학교 문제점 비판', '선린인터넷고등학교 교육과정 이슈', '선린인터넷고등학교 학생 후기 불만',
            ],
          },
          {
            sourceType: 'TEXT', content: '선린인터넷고등학교는 IT 특성화로 평가받지만, 교육과 행정 문제, 경쟁 압박, 졸업 후 진로 등 일부 비판도 존재함을 발견했습니다. 다음 단계는 상세 분석입니다.',
          },
          {
            sourceType: 'ACTION',
            action:     'searchBrowser',
            parameters: ['https://namu.wiki/w/%EC%84%A0%EB%A6%B0%EC%9D%B8%ED%84%B0%EB%84%B7%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90'],
          },
          {
            sourceType: 'ACTION',
            action:     'searchBrowser',
            parameters: ['https://blog.sechack.kr/91'],
          },
          {
            sourceType: 'ACTION',
            action:     'readFile',
            parameters: ['page_texts/namu.wiki_w__EC_84_A0_EB_A6_B0_EC_9D_B8_ED_84_B0_EB_84_B7_EA_B3_A0_EB_93_B1_ED_95_99_EA_B5_90.txt'],
          },
          {
            sourceType: 'TEXT',
            content:    '학교는 자유롭고 IT 중심이지만, 교육 한계, 실용성 부족, 진로 불안, 학생 불만 등 문제점도 파악됨. 다음은 상세 분석입니다.',
          },
          {
            sourceType: 'ACTION',
            action:     'searchBrowser',
            parameters: ['https://blog.naver.com/mimitak/223116341333?viewType=pc'],
          },
          {
            sourceType: 'ACTION',
            action:     'scrollDown',
          },
        ],
      },
      {
        title:   '선린인터넷고등학교에 대한 정보 수집 및 분석',
        status:  'PENDING',
        sources: [
          {
            sourceType: 'ACTION',
            action:     'searchApi',
            parameters: [
              '선린인터넷고등학교 문제점 비판', '선린인터넷고등학교 교육과정 이슈', '선린인터넷고등학교 학생 후기 불만',
            ],
          },
          {
            sourceType: 'TEXT', content: '선린인터넷고등학교는 IT 특성화로 평가받지만, 교육과 행정 문제, 경쟁 압박, 졸업 후 진로 등 일부 비판도 존재함을 발견했습니다. 다음 단계는 상세 분석입니다.',
          },
          {
            sourceType: 'ACTION',
            action:     'searchBrowser',
            parameters: ['https://namu.wiki/w/%EC%84%A0%EB%A6%B0%EC%9D%B8%ED%84%B0%EB%84%B7%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90'],
          },
          {
            sourceType: 'ACTION',
            action:     'searchBrowser',
            parameters: ['https://blog.sechack.kr/91'],
          },
          {
            sourceType: 'ACTION',
            action:     'readFile',
            parameters: ['page_texts/namu.wiki_w__EC_84_A0_EB_A6_B0_EC_9D_B8_ED_84_B0_EB_84_B7_EA_B3_A0_EB_93_B1_ED_95_99_EA_B5_90.txt'],
          },
          {
            sourceType: 'TEXT',
            content:    '학교는 자유롭고 IT 중심이지만, 교육 한계, 실용성 부족, 진로 불안, 학생 불만 등 문제점도 파악됨. 다음은 상세 분석입니다.',
          },
          {
            sourceType: 'ACTION',
            action:     'searchBrowser',
            parameters: ['https://blog.naver.com/mimitak/223116341333?viewType=pc'],
          },
          {
            sourceType: 'ACTION',
            action:     'scrollDown',
          },
        ],
      },
    ] },
  },
];

export default function ChatPage() {
  return (
    <VStack fullWidth fullHeight padding={[20, 16]} spacing={16}>
      <VStack fullWidth justify='start'>
        <Typography.Title>채팅방 이름</Typography.Title>
      </VStack>

      <VStack fullWidth justify='start' className='flex-1 min-h-0 overflow-y-auto' spacing={20}>
        {
          chatData.map(chat => {
            if (chat.role === 'USER') {
              return (
                <HStack fullWidth key={chat.id} justify='end'>
                  <HStack className='bg-grayscale-600 border border-grayscale-600 rounded-[12px]' padding={[8, 10]}>
                    <Typography.Body>{chat.content}</Typography.Body>
                  </HStack>
                </HStack>
              );
            } else {
              return (
                <HStack fullWidth key={chat.id}
                  justify='start' className='min-w-0'>
                  <VStack fullWidth spacing={16} className='min-w-0'>
                    <VStack spacing={8}>
                      <Typography.Label className='text-grayscale-300'>SpeechOne</Typography.Label>
                      <Typography.Body className='whitespace-pre-line wrap-break-word' markdown>{chat.content}</Typography.Body>
                    </VStack>

                    <VStack spacing={8}>
                      {
                        chat.agentResponse?.subTasks.map(subTask => {
                          return (
                            <AgentSubTask key={subTask.title} title={subTask.title}>
                              {
                                subTask.sources.map(source => {
                                  return (
                                    <AgentSubTaskSource key={source.sourceType} sourceType={source.sourceType} icon={toolConfig[source.action ?? 'searchApi'].icon} description={toolConfig[source.action ?? 'searchApi'].description} content={source.content} parameters={source.parameters} />
                                  );
                                })
                              }
                            </AgentSubTask>
                          );
                        })
                      }
                    </VStack>
                  </VStack>
                </HStack>
              );
            }
          })
        }
      </VStack>

      <div className='shrink-0 w-full'>
        <ChatInput />
      </div>
    </VStack>
  );
}

interface AgentSubTaskProps {
  title:    string;
  children: React.ReactNode | React.ReactNode[];
}

function AgentSubTask(props: AgentSubTaskProps) {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;

      setContentHeight(height);
    }
  }, [children]);

  const totalHeight = isOpen ? contentHeight + 32 : 24;

  return (
    <HStack fullWidth align='start' spacing={8} className='min-w-0'>
      <AnimatedVStack
        initial={false}
        animate={{ height: totalHeight }}
        transition={{
          duration: 0.3,
          ease:     [
            0.4, 0, 0.2, 1,
          ],
          delay: isOpen ? 0 : 0.05,
        }}
        style={{ willChange: 'height' }}
        className='shrink-0'
        align='center'
      >
        <Icon name='check-circle-2' size={20} className='shrink-0 text-grayscale-200 mt-[4px]' />
        <div className='w-[2px] flex-1 border-0' style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, rgb(107 114 128) 4px, rgb(107 114 128) 6px)' }}/>
      </AnimatedVStack>

      <VStack fullWidth className='min-w-0'>
        <HStack spacing={8} onClick={() => setIsOpen(!isOpen)} className='min-w-0 cursor-pointer select-none transition-all duration-300 hover:bg-grayscale-700 active:bg-grayscale-600 rounded-[8px]' padding={[4, 6]}>
          <Typography.Label className='min-w-0 truncate text-grayscale-200'>{title}</Typography.Label>
          <Icon name='chevron-down' size={24} className={`shrink-0 text-grayscale-200 ${isOpen ? '' : '-rotate-180'} transition-all duration-300`}/>
        </HStack>

        <motion.div
          initial={false}
          animate={{
            height:  isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease:     [
              0.4, 0, 0.2, 1,
            ],
          }}
          style={{ overflow: 'hidden' }}
          className='min-w-0 w-full'
        >
          <motion.div
            ref={contentRef}
            initial={false}
            animate={isOpen ? 'visible' : 'hidden'}
            variants={{
              visible: { transition: {
                staggerChildren: 0.03,
                delayChildren:   0,
              } },
              hidden: { transition: {
                staggerChildren:  0.02,
                staggerDirection: -1,
              } },
            }}
            className='min-w-0 w-full'
          >
            <VStack spacing={12} padding={[8, 0]} className='min-w-0 w-full'>
              {Array.isArray(children)
                ? children.map((child, index) => (
                  <motion.div
                    key={index}
                    className='min-w-0 w-full'
                    style={{ willChange: 'transform, opacity' }}
                    variants={{
                      visible: {
                        opacity:    1,
                        y:          0,
                        transition: {
                          duration: 0.18,
                          ease:     [
                            0.4, 0, 0.2, 1,
                          ],
                        },
                      },
                      hidden: {
                        opacity:    0,
                        y:          -10,
                        transition: {
                          duration: 0.12,
                          ease:     'easeIn',
                        },
                      },
                    }}
                  >
                    {child}
                  </motion.div>
                ))
                : (
                  <motion.div
                    className='min-w-0 w-full'
                    style={{ willChange: 'transform, opacity' }}
                    variants={{
                      visible: {
                        opacity: 1,
                        y:       0,
                      },
                      hidden: {
                        opacity: 0,
                        y:       -10,
                      },
                    }}
                  >
                    {children}
                  </motion.div>
                )}
            </VStack>
          </motion.div>
        </motion.div>
      </VStack>
    </HStack>
  );
}

interface AgentSubTaskSourceProps {
  sourceType:   'ACTION' | 'TEXT';
  icon?:        IconName;
  description?: string;
  content?:     string;
  parameters?:  string[];
}

function AgentSubTaskSource(props: AgentSubTaskSourceProps) {
  const {
    sourceType,
    icon,
    description,
    content,
    parameters,
  } = props;

  if (sourceType === 'ACTION') {
    return (
      <HStack spacing={4} padding={[4, 10]} className='bg-grayscale-700 rounded-[24px] min-w-0 max-w-full'>
        <Icon name={icon ?? 'file'} size={20} className='shrink-0' />
        <Typography.Label className='shrink-0'>{description}</Typography.Label>

        {parameters && parameters.length > 0 && <Typography.Label className='min-w-0 flex-1 truncate text-grayscale-300'>{parameters.join(', ')}</Typography.Label>}
      </HStack>
    );
  } else {
    return (
      <Typography.Body className='wrap-break-word'>{content}</Typography.Body>
    );
  }
}
