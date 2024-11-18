import { ExtendedRequest } from "../types/extended-request";
import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url";

export const findPost = async (id:number) => {
    const post = await prisma.post.findFirst({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: { id }
    });

    if(post){
        post.user.avatar = getPublicURL(post.user.avatar);
        return post;
    }
    return null;
}

export const createPost = async (slug: string, body: string, comment?: number) => {
    const newPost = await prisma.post.create({
        data: {
            userSlug: slug,
            body,
            commentOf: comment ?? 0
        }
    });
    return newPost;
}

export const findCommentsFromPost = async (id:number) => {
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: { commentOf: id }
    });

    for(let postIndex in posts){
        posts[postIndex].user.avatar = getPublicURL(posts[postIndex].user.avatar)
    }

    return posts;
}

export const checkIfPostIsLikedByUser = async (slug:string, id:number) => {
    const isLiked = await prisma.postLike.findFirst({
        where: {
            userSlug: slug,
            postId: id
        }
    });

    return isLiked ? true : false;
}

export const unlikePost = async (slug:string, id:number) => {
    await prisma.postLike.deleteMany({
        where: {
            userSlug: slug,
            postId: id
        }
    });
}

export const likePost = async (slug:string, id:number) => {
    await prisma.postLike.create({
        data: {
            userSlug: slug,
            postId: id
        }
    });
}

export const findPostFeed = async (following: string[], currentPage: number, perPage: number) => {
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: {
            userSlug: {
                in: following
            },
            commentOf: 0
        },
        orderBy: { createdAt: 'desc' },
        skip: currentPage * perPage,
        take: perPage
    });

    for(let postIndex in posts){
        posts[postIndex].user.avatar = getPublicURL(posts[postIndex].user.avatar)
    }

    return posts;
}

export const findPostsByBody = async (bodyContains: string, currentPage: number, perPage: number) => {
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: {
            body: {
                contains: bodyContains,
                mode: 'insensitive'
            },
            commentOf: 0
        },
        orderBy: { createdAt: 'desc' },
        skip: currentPage * perPage,
        take: perPage
    });

    for(let postIndex in posts){
        posts[postIndex].user.avatar = getPublicURL(posts[postIndex].user.avatar)
    }

    return posts;
}