import { AnimatePresence, motion } from 'framer-motion';
import { VStack } from '@/shared/components/layout';
import { SettingsBreadcrumb } from './breadcrumb';

interface SettingsTemplateProps {
  children: React.ReactNode;
  pageKey:  string;
}

export function SettingsTemplate(props: SettingsTemplateProps) {
  const { children, pageKey } = props;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pageKey}
        initial={{
          opacity: 0,
          x:       20,
        }}
        animate={{
          opacity: 1,
          x:       0,
        }}
        exit={{
          opacity: 0,
          x:       -20,
        }}
        transition={{
          duration: 0.2,
          ease:     'easeInOut',
        }}
        className='flex-1 w-full overflow-hidden'
      >
        <VStack fullWidth fullHeight spacing={32} justify='start'>
          <SettingsBreadcrumb />
          {children}
        </VStack>
      </motion.div>
    </AnimatePresence>

  );
}
