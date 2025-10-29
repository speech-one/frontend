import { z } from 'zod';

export const authLoginSchema = z.object({
  email:    z.email(),
  password: z.string().min(8),
});

export type AuthLoginRequest = z.infer<typeof authLoginSchema>;
