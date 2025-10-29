import z from 'zod';

export const authRegisterSchema = z.object({
  name:     z.string().min(1),
  email:    z.email(),
  password: z.string().min(8),
  avatar:   z.file().optional(),
});

export type AuthRegisterRequest = z.infer<typeof authRegisterSchema>;
