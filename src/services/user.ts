import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { getPublicURL } from "../utils/url";

export const findUserByEmail = async (email: string) => {
   const user = await prisma.user.findFirst({
      where: { email },
   });

   if (user) {
      return {
         ...user,
         avatar: getPublicURL(user.avatar),
         cover: getPublicURL(user.cover),
      };
   }

   return null;
};

export const findUserBySlug = async (slug: string) => {
   const user = await prisma.user.findFirst({
      select: {
         avatar: true,
         cover: true,
         slug: true,
         bio: true,
         link: true,
         name: true,
      },
      where: { slug },
   });

   if (user) {
      return {
         ...user,
         avatar: getPublicURL(user.avatar),
         cover: getPublicURL(user.cover),
      };
   }

   return null;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
   const newUser = await prisma.user.create({ data });

   return {
      ...newUser,
      avatar: getPublicURL(newUser.avatar),
      cover: getPublicURL(newUser.cover),
   };
};

export const getUserFollowingCount = async (slug: string) => {
   const count = await prisma.follow.count({
      where: { user1Slug: slug },
   });
   return count;
};

export const getUserFollowersCount = async (slug: string) => {
   const count = await prisma.follow.count({
      where: { user2Slug: slug },
   });
   return count;
};

export const getUserPostsCount = async (slug: string) => {
   const count = await prisma.post.count({
      where: { userSlug: slug },
   });
   return count;
};

export const findPostsByUser = async (
   slug: string,
   currentPage: number,
   perPage: number
) => {
   const posts = await prisma.post.findMany({
      include: {
         user: {
            select: {
               name: true,
               avatar: true,
               slug: true,
            },
         },
         likes: {
            select: {
               userSlug: true,
            },
         },
      },
      where: { userSlug: slug, commentOf: 0 },
      orderBy: { createdAt: "desc" },
      skip: currentPage * perPage,
      take: perPage,
   });

   return posts;
};

export const checkIfFollows = async (user1Slug: string, user2Slug: string) => {
   const follows = await prisma.follow.findFirst({
      where: { user1Slug, user2Slug },
   });

   return follows ? true : false;
};

export const followUser = async (user1Slug: string, user2Slug: string) => {
   await prisma.follow.create({
      data: { user1Slug, user2Slug },
   });
};

export const unfollowUser = async (user1Slug: string, user2Slug: string) => {
   await prisma.follow.deleteMany({
      where: { user1Slug, user2Slug },
   });
};

export const updateUserInfo = async (
   slug: string,
   data: Prisma.UserUpdateInput
) => {
   await prisma.user.update({
      where: { slug },
      data,
   });
};

export const getUserFollowing = async (slug: string) => {
   const following = [];
   const reqFollow = await prisma.follow.findMany({
      select: {
         user2Slug: true,
      },
      where: { user1Slug: slug },
   });

   for (let follow of reqFollow) {
      following.push(follow.user2Slug);
   }

   return following;
};

export const getFollowSuggestions = async (slug: string) => {
   const following = await getUserFollowing(slug);

   const followingPlusMe = [...following, slug];

   type Suggestion = Pick<
      Prisma.UserGetPayload<Prisma.UserDefaultArgs>,
      "name" | "avatar" | "slug"
   >;

   const suggestions: Suggestion[] = await prisma.$queryRaw`
        SELECT
            name, avatar, slug
        FROM "User"
        WHERE
            slug NOT IN (${followingPlusMe.join(",")})
        ORDER BY RANDOM()
        LIMIT 2;
    `;

   for (let slugIndex in suggestions) {
      suggestions[slugIndex].avatar = getPublicURL(
         suggestions[slugIndex].avatar
      );
   }
};

export const saveImage = async (slug: string, data: Prisma.UserUpdateInput) => {
   await prisma.user.update({
      where: { slug },
      data,
   });
};
