import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { searchSchema } from "../schemas/search";
import { findPostsByBody } from "../services/post";


export const searchPosts = async (req: ExtendedRequest, res: Response) => {
    const safeData = searchSchema.safeParse(req.query);
    if(!safeData.success){
        return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    let perPage = 10;
    let currentPage = safeData.data.page || 0;

    const posts = await findPostsByBody(
        safeData.data.q || '',
        currentPage,
        perPage
    );

    res.json({ posts, page: currentPage });
}