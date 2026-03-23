import { z } from 'zod';

export const roleSchema = z.enum(['INTERN', 'ENGINEER', 'ADMIN']);

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.string().min(1),
  role: roleSchema,
});

export type UserDto = z.infer<typeof userSchema>;
