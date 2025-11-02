import z from 'zod';

export const updateMcpSchema = z.object({ json: z.string().min(1, { error: 'JSON은 최소 1자 이상이어야 합니다.' }) });
export type UpdateMcpRequest = z.infer<typeof updateMcpSchema>;
