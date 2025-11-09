
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const MeSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  iat: z.number(),
  exp: z.number(),
});

export const LoginDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const RefreshSessionDataSchema = z.object({
  userId: z.string(),
  refreshToken: z.string(),
});

export type LoginData = z.infer<typeof LoginDataSchema>;
export type RegisterData = z.infer<typeof RegisterDataSchema>;
export type RefreshSessionData = z.infer<typeof RefreshSessionDataSchema>;
export type LoginResponseData = z.infer<typeof LoginResponseSchema>;
