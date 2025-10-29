import z from 'zod';

export const authRefreshSchema = z.object({ refreshToken: z.string() });
export type AuthRefreshRequest = z.infer<typeof authRefreshSchema>;
