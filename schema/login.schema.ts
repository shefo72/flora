import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().nonempty('email is requird').pipe(z.email('invaled email')),
    password: z.string().nonempty('password is required'),
    rememberMe: z.boolean(),
});

export type LoginFormValues=z.infer<typeof loginSchema>