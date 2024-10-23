import { z } from "zod";

export const addPostSchema = z.object({
    body: z.string({message: 'Precisa enviar um corpo!'}),
    comment: z.string().optional()
});