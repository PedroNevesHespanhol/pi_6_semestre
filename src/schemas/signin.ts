import { z } from "zod";

export const signinSchema = z.object({
    email: z.string({message: 'E-mail é obrigatório!'}).email('E-mail inválido!'),
    password: z.string({message: 'Senha é obrigatória!'}).min(8, 'Precisa ter 8 ou mais caracteres!')
})