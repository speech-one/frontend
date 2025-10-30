import { z } from 'zod';

export const authLoginSchema = z.object({
  email:    z.email({ error: '이메일 형식이 올바르지 않습니다.' }),
  password: z.string().min(8, { error: '비밀번호는 8자 이상이어야 합니다.' }),
});

export type AuthLoginRequest = z.infer<typeof authLoginSchema>;
