import { Request, Response } from 'express';
import { ExtendedRequest } from '../types/extended-request';
import { checkIfFollows, findPostsByUser, findUserBySlug, followUser, getUserFollowersCount, getUserFollowingCount, getUserPostsCount, saveImage, unfollowUser, updateUserInfo } from '../services/user';
import { userPostsSchema } from '../schemas/user-posts';
import { updateUserSchema } from '../schemas/update-user';
import { uploadAvatarSchema } from '../schemas/avatar';
import { uploadCoverSchema } from '../schemas/cover';

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

    let perPage = 10;
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

export const uploadAvatar = async (req: ExtendedRequest, res: Response) => {
    try {

        const me = req.userSlug as string;
        console.log(me)
        const file = req.file;
        console.log(file)
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const avatar = `${file.destination}/${file.filename}`;

        const body = { avatar: avatar }
        console.log(body)
        const safeData = uploadAvatarSchema.safeParse(body);
        console.log(safeData)
        if (!safeData.success) return res.json({ error: safeData.error.flatten().fieldErrors });

        await saveImage(me, { ...safeData.data, avatar });
        
        res.json({ message: 'Success', avatar: avatar });
    } catch (error) {
        console.log(req, res, error);
    }
};

export const uploadCover = async (req: ExtendedRequest, res: Response) => {
    try {

        const me = req.userSlug as string;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const cover = `${file.destination}/${file.filename}`;

        const body = { cover: cover }
        const safeData = uploadCoverSchema.safeParse(body);
        if (!safeData.success) return res.json({ error: safeData.error.flatten().fieldErrors });

        await saveImage(me, { ...safeData.data, cover });
        
        res.json({ message: 'Success', cover: cover });
    } catch (error) {
        console.log(req, res, error);
    }
};