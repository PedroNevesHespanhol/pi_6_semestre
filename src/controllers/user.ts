import { Request, Response } from 'express';
import { ExtendedRequest } from '../types/extended-request';
import { checkIfFollows, findPostsByUser, findUserBySlug, followUser, getUserFollowersCount, getUserFollowingCount, getUserPostsCount, unfollowUser, updateUserInfo } from '../services/user';
import { userPostsSchema } from '../schemas/user-posts';
import { updateUserSchema } from '../schemas/update-user';

export const getUser = async (req: ExtendedRequest, res: Response) => {
    // Your logic to get a user
    const { slug } = req.params;

    const user = await findUserBySlug(slug);
    if(!user) return res.json({ error: 'Usuário inexistente!'});

    const followingCount = await getUserFollowingCount(slug);
    const followersCount = await getUserFollowersCount(slug);
    const postCount = await getUserPostsCount(slug);

    res.json({ user, followingCount, followersCount, postCount });
};

export const getUserPosts = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;

    const safeData = userPostsSchema.safeParse(req.query);
    if(!safeData.success) return res.json({ error: safeData.error.flatten().fieldErrors });

    let perPage = 2;
    let currentPage = safeData.data.page || 0;

    const posts = await findPostsByUser(slug, currentPage, perPage);

    res.json({ posts, page: currentPage });
}

export const followToggle = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;

    const me = req.userSlug as string;

    const hasUserToBeFollowed = await findUserBySlug(slug);
    if(!hasUserToBeFollowed) return res.json({ error: 'Usuário inexistente!' });

    const follows = await checkIfFollows(me, slug);
    if(!follows) {
        await followUser(me, slug);
        res.json({ following: true });
    } else {
        await unfollowUser(me, slug);
        res.json({ following: false });
    }
}

export const updateUser = async (req: ExtendedRequest, res: Response) => {
    const safeData = updateUserSchema.safeParse(req.body);
    if(!safeData.success) return res.json({ error: safeData.error.flatten().fieldErrors });

    await updateUserInfo(
        req.userSlug as string, 
        safeData.data
    );
    res.json({ message: 'Sucess' });
}