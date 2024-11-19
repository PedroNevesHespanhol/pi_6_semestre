import { z } from "zod";

export const uploadCoverSchema = z.object({
    cover: z.string().url('Precisa ser uma URL válida')
});