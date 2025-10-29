import z from 'zod';

export const authLogoutSchema = z.object({ refreshToken: z.string() });
export type AuthLogoutRequest = z.infer<typeof authLogoutSchema>;
