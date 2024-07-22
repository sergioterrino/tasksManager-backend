import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Username required'
  }),
  email: z.string({
    required_error: 'Email required'
  }).email({
    required_error: 'Invalid email'
  }),
  password: z.string({
    required_error: 'Password required'
  }).min(8, {
    message: 'Password must be at least 8 characters'
  })
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email required"
  }).email({
    required_error: "Invalid email"
  }),
  password: z.string({
    required_error: "Password required"
  }).min(8, {
    message: 'Password must be at least 8 characters'
  })
});
