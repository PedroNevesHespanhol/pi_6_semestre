import { z } from "zod";

export const uploadAvatarSchema = z.object({
    avatar: z.string().url('Precisa ser uma URL válida')
});