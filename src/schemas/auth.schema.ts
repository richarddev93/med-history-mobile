import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const LoginResponseSchema = z.object({
 ...TokenSchema.shape,
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
  }),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RefreshSessionData = {
  userId:LoginResponse['user']['id'];
  refreshToken: LoginResponse['refreshToken'];
};
