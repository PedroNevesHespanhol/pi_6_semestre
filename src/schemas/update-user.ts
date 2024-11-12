import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string({ message: 'Nome obrigatório'}).min(3, { message: 'M;ínimo 2 caracteres' }).optional(),
  bio: z.string().optional(),
  link: z.string().url('Precisa ser uma URL válida').optional()
});