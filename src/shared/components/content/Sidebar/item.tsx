import { AnimatePresence, motion } from 'framer-motion';
import { IconName } from 'lucide-react/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, Typography } from '@/shared/components/foundation';
import { AnimatedHStack } from '@/shared/components/layout';
import { cn } from '@/shared/utils';
import { useSidebar } from './context';

interface SidebarItemProps {
  icon?: IconName;
  title: string;
  href:  string;
}

export function SidebarItem(props: SidebarItemProps) {
  const {
    icon,
    title,
    href,
  } = props;

  const isActive = usePathname() === href;
  const { isOpen } = useSidebar();

  return (
    <Link href={href} className='w-full'>
      <AnimatedHStack fullWidth padding={10} spacing={10} justify='start' className={cn('hover:bg-grayscale-800 active:bg-grayscale-700 rounded-[8px] transition-all duration-150', isActive ? 'bg-grayscale-700' : '')}>
        {
          icon &&
          <Icon name={icon} size={20} className='text-grayscale-200' />
        }

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0, width: 0,
              }}
              animate={{
                opacity: 1, width: 'auto',
              }}
              exit={{
                opacity: 0, width: 0,
              }}
              transition={{ duration: 0.2 }}
              className='overflow-hidden flex-1 min-w-0'
            >
              <Typography.Label className='text-grayscale-200 truncate'>{title}</Typography.Label>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedHStack>
    </Link>
  );
}
