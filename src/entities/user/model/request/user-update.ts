import z from 'zod';

export const userUpdateSchema = z.object({
  name: z.string().min(1, { error: '이름은 최소 1자 이상이어야 합니다.' })
    .max(20, { error: '이름은 최대 20자 이하여야 합니다.' })
    .optional(),
  profileImage: z.union([z.file(), z.string()]).optional()
    .nullable(),
});

export type UserUpdateRequest = z.infer<typeof userUpdateSchema>;
