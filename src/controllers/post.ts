import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { addPostSchema } from "../schemas/add-post";
import { checkIfPostIsLikedByUser, createPost, findCommentsFromPost, findPost, likePost, unlikePost } from "../services/post";
import { addHashtag } from "../services/trend";

export const addPost = async (req: ExtendedRequest, res: Response) => {
    // validar dados
    const safeData = addPostSchema.safeParse(req.body);
    if(!safeData.success){
        return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    // verificar se é comment
    if(safeData.data.comment){
        const  hasCommentPost = await findPost(parseInt(safeData.data.comment));
        if(!hasCommentPost) {
            return res.json({ error: 'Post original inexistente!'});
        }
    }

    // cria o post
    const newPost = await createPost(
        req.userSlug as string,
        safeData.data.body,
        safeData.data.comment ? parseInt(safeData.data.comment) : 0
    );
    
    // enviar hashtag para os trends
    const hashtags = safeData.data.body.match(/#[a-zA-Z0-9_]+/g);
    if(hashtags){
        for(let hashtag of hashtags) {
            if(hashtag.length >= 2) {
                await addHashtag(hashtag);
            }
        }
    }

    res.json({ post: newPost });
}

export const getPost = async (req:ExtendedRequest, res: Response) => {
    const { id } = req.params;

    const post = await findPost(parseInt(id));
    if(!post) return res.json({ error: 'Post inexistente!'});

    res.json({ post });
}

export const getComments = async (req:ExtendedRequest, res: Response) => {
    const { id } = req.params;

    const comments = await findCommentsFromPost(parseInt(id));

    res.json({ comments });
}

export const likeToggle = async (req:ExtendedRequest, res: Response) => {
    const { id } = req.params;

    const liked = await checkIfPostIsLikedByUser(
        req.userSlug as string,
        parseInt(id)
    );

    if(liked) {
        // unlike
        unlikePost(
            req.userSlug as string,
            parseInt(id)
        );
    } else {
        // like
        likePost(
            req.userSlug as string,
            parseInt(id)
        );
    }

    res.json({});
}