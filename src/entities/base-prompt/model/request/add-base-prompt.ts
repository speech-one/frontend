import z from 'zod';

export const addBasePromptSchema = z.object({ prompt: z.string().min(1, { error: '프롬프트는 최소 1자 이상이어야 합니다.' }) });
export type AddBasePromptRequest = z.infer<typeof addBasePromptSchema>;
