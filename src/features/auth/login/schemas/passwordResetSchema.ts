// src/features/auth/schemas/passwordResetSchema.ts
import { z } from 'zod';

export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
});

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;