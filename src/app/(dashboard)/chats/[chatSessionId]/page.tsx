'use client';

import { motion } from 'framer-motion';
import { IconName } from 'lucide-react/dynamic';
import React, { useState } from 'react';
import { AnimatedPresence } from '@/shared/components/animate';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
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
        icon?:       IconName;
        action?:     string;
        content?:    string;
        parameters?: string[];
      }[];
    }[];
  };
}

const chatData: ChatData[] = [
  {
    id:      '1',
    role:    'USER',
    content: '다양한 측면으로 까줘',
  },
  {
    id:            '2',
    role:          'AGENT',
    content:       '네 알겠습니다. **교육, 운영, 진로 등 다양한 측면에서 비판적인 관점**을 담아 프레젠테이션을 구성하겠습니다.\n현재 1단계인 **선린인터넷고등학교에 대한 정보 수집 및 분석**을 진행 중입니다. 다양한 비판적 관점을 도출하기 위해 학교의 현황, 교육 과정, 학생들의 평가 등 광범위한 정보를 수집하겠습니다.\n정보 수집 후, 2단계인 **비판적 관점의 슬라이드 콘텐츠 작성** 단계로 넘어가겠습니다. 잠시만 기다려주십시오.',
    agentResponse: { subTasks: [
      {
        title:   '선린인터넷고등학교에 대한 정보 수집 및 분석',
        status:  'PENDING',
        sources: [
          {
            sourceType: 'ACTION',
            action:     '검색',
            icon:       'search',
            parameters: [
              '선린인터넷고등학교 문제점 비판', '선린인터넷고등학교 교육과정 이슈', '선린인터넷고등학교 학생 후기 불만',
            ],
          },
          {
            sourceType: 'TEXT', content: '선린인터넷고등학교는 IT 특성화로 평가받지만, 교육과 행정 문제, 경쟁 압박, 졸업 후 진로 등 일부 비판도 존재함을 발견했습니다. 다음 단계는 상세 분석입니다.',
          },
          {
            sourceType: 'ACTION',
            icon:       'compass',
            action:     '검색 중',
            parameters: ['https://namu.wiki/w/%EC%84%A0%EB%A6%B0%EC%9D%B8%ED%84%B0%EB%84%B7%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90'],
          },
          {
            sourceType: 'ACTION',
            icon:       'compass',
            action:     '검색 중',
            parameters: ['https://blog.sechack.kr/91'],
          },
          {
            sourceType: 'ACTION',
            icon:       'file-text',
            action:     '파일을 읽는 중',
            parameters: ['page_texts/namu.wiki_w__EC_84_A0_EB_A6_B0_EC_9D_B8_ED_84_B0_EB_84_B7_EA_B3_A0_EB_93_B1_ED_95_99_EA_B5_90.txt'],
          },
          {
            sourceType: 'TEXT',
            content:    '학교는 자유롭고 IT 중심이지만, 교육 한계, 실용성 부족, 진로 불안, 학생 불만 등 문제점도 파악됨. 다음은 상세 분석입니다.',
          },
          {
            sourceType: 'ACTION',
            icon:       'search',
            action:     '검색 중',
            parameters: ['https://blog.naver.com/mimitak/223116341333?viewType=pc'],
          },
          {
            sourceType: 'ACTION',
            icon:       'arrow-down',
            action:     '아래로 스크롤 중',
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

      <VStack fullWidth justify='start' className='flex-1 min-h-0' spacing={20}>
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
                  <VStack fullWidth spacing={8} className='min-w-0'>
                    <Typography.Label className='text-grayscale-300'>{chat.content}</Typography.Label>
                    <Typography.Body className='whitespace-pre-line wrap-break-word'>{chat.content}</Typography.Body>

                    {
                      chat.agentResponse?.subTasks.map(subTask => {
                        return (
                          <AgentSubTask key={subTask.title} title={subTask.title}>
                            {
                              subTask.sources.map(source => {
                                return (
                                  <AgentSubTaskSource key={source.sourceType} sourceType={source.sourceType} icon={source.icon} action={source.action} content={source.content} parameters={source.parameters} />
                                );
                              })
                            }
                          </AgentSubTask>
                        );
                      })
                    }
                  </VStack>
                </HStack>
              );
            }
          })
        }
      </VStack>

      <ChatInput />
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

  return (
    <HStack fullWidth align='stretch' spacing={8} className='min-w-0'>
      <VStack className='shrink-0 self-stretch h-auto!' align='center'>
        <Icon name='check-circle-2' size={20} className='shrink-0' />
        <div className='w-[2px] flex-1 border-0' style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, rgb(107 114 128) 4px, rgb(107 114 128) 6px)' }}/>
      </VStack>

      <VStack fullWidth className='min-w-0'>
        <HStack spacing={8} onClick={() => setIsOpen(!isOpen)} className='min-w-0'>
          <Typography.Label className='min-w-0 truncate'>{title}</Typography.Label>
          <Icon name='chevron-down' size={24} className={`shrink-0 ${isOpen ? '' : 'rotate-180'}`}/>
        </HStack>

        <AnimatedPresence isOpen={isOpen} fullWidth className='min-w-0'>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              className='min-w-0 w-full'
              variants={{
                visible: { transition: {
                  staggerChildren: 0.05,
                  delayChildren:   0.05,
                } },
                hidden: { transition: {
                  staggerChildren:  0.03,
                  staggerDirection: -1,
                } },
              }}
            >
              <VStack spacing={12} padding={[8, 0]} className='min-w-0 w-full'>
                {Array.isArray(children)
                  ? children.map((child, index) => (
                    <motion.div
                      key={index}
                      className='min-w-0 w-full'
                      variants={{
                        visible: {
                          opacity:    1,
                          y:          0,
                          transition: {
                            duration: 0.2,
                            ease:     'easeOut',
                          },
                        },
                        hidden: {
                          opacity:    0,
                          y:          -10,
                          transition: {
                            duration: 0.15,
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
          )}
        </AnimatedPresence>
      </VStack>
    </HStack>
  );
}

interface AgentSubTaskSourceProps {
  sourceType:  'ACTION' | 'TEXT';
  icon?:       IconName;
  action?:     string;
  content?:    string;
  parameters?: string[];
}

function AgentSubTaskSource(props: AgentSubTaskSourceProps) {
  const {
    sourceType,
    icon,
    action,
    content,
    parameters,
  } = props;

  if (sourceType === 'ACTION') {
    return (
      <HStack spacing={4} padding={[4, 10]} className='bg-grayscale-600 rounded-[24px] min-w-0 max-w-full'>
        <Icon name={icon ?? 'file'} size={20} className='shrink-0' />
        <Typography.Label className='shrink-0'>{action}</Typography.Label>

        {parameters && parameters.length > 0 && <Typography.Label className='min-w-0 flex-1 truncate text-grayscale-300'>{parameters.join(', ')}</Typography.Label>}
      </HStack>
    );
  } else {
    return (
      <Typography.Body className='wrap-break-word'>{content}</Typography.Body>
    );
  }
}
