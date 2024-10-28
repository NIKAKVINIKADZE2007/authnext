import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(5, 'password must contain at least 5 cherechter')
  .max(50, 'Maximum charechter 50');
