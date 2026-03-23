import { z } from 'zod';
import { roleSchema } from '../schemas/user.schema';

export const createUserSchema = z.object({
  name: z.string().trim().min(1, 'name is required'),
  email: z.string().trim().min(1, 'email is required'),
  role: z
    .string()
    .trim()
    .min(1, 'role is required')
    .toUpperCase()
    .pipe(roleSchema),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
