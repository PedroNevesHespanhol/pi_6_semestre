"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
   key in obj
      ? __defProp(obj, key, {
           enumerable: true,
           configurable: true,
           writable: true,
           value,
        })
      : (obj[key] = value);
var __spreadValues = (a, b) => {
   for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
   if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
         if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
   return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
   for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
   if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
         if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, {
               get: () => from[key],
               enumerable:
                  !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
            });
   }
   return to;
};
var __toCommonJS = (mod) =>
   __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
   return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
         try {
            step(generator.next(value));
         } catch (e) {
            reject(e);
         }
      };
      var rejected = (value) => {
         try {
            step(generator.throw(value));
         } catch (e) {
            reject(e);
         }
      };
      var step = (x) =>
         x.done
            ? resolve(x.value)
            : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
   });
};

// src/services/user.ts
var user_exports = {};
__export(user_exports, {
   checkIfFollows: () => checkIfFollows,
   createUser: () => createUser,
   findPostsByUser: () => findPostsByUser,
   findUserByEmail: () => findUserByEmail,
   findUserBySlug: () => findUserBySlug,
   followUser: () => followUser,
   getFollowSuggestions: () => getFollowSuggestions,
   getUserFollowersCount: () => getUserFollowersCount,
   getUserFollowing: () => getUserFollowing,
   getUserFollowingCount: () => getUserFollowingCount,
   getUserPostsCount: () => getUserPostsCount,
   unfollowUser: () => unfollowUser,
   updateUserInfo: () => updateUserInfo,
});
module.exports = __toCommonJS(user_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/utils/url.ts
var getPublicURL = (url) => {
   return `${process.env.BASE_URL}/${url}`;
};

// src/services/user.ts
var findUserByEmail = (email) =>
   __async(void 0, null, function* () {
      const user = yield prisma.user.findFirst({
         where: { email },
      });
      if (user) {
         return __spreadProps(__spreadValues({}, user), {
            avatar: getPublicURL(user.avatar),
            cover: getPublicURL(user.cover),
         });
      }
      return null;
   });
var findUserBySlug = (slug) =>
   __async(void 0, null, function* () {
      const user = yield prisma.user.findFirst({
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
         return __spreadProps(__spreadValues({}, user), {
            avatar: getPublicURL(user.avatar),
            cover: getPublicURL(user.cover),
         });
      }
      return null;
   });
var createUser = (data) =>
   __async(void 0, null, function* () {
      const newUser = yield prisma.user.create({ data });
      return __spreadProps(__spreadValues({}, newUser), {
         avatar: getPublicURL(newUser.avatar),
         cover: getPublicURL(newUser.cover),
      });
   });
var getUserFollowingCount = (slug) =>
   __async(void 0, null, function* () {
      const count = yield prisma.follow.count({
         where: { user1Slug: slug },
      });
      return count;
   });
var getUserFollowersCount = (slug) =>
   __async(void 0, null, function* () {
      const count = yield prisma.follow.count({
         where: { user2Slug: slug },
      });
      return count;
   });
var getUserPostsCount = (slug) =>
   __async(void 0, null, function* () {
      const count = yield prisma.post.count({
         where: { userSlug: slug },
      });
      return count;
   });
var findPostsByUser = (slug, currentPage, perPage) =>
   __async(void 0, null, function* () {
      const posts = yield prisma.post.findMany({
         include: {
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
   });
var checkIfFollows = (user1Slug, user2Slug) =>
   __async(void 0, null, function* () {
      const follows = yield prisma.follow.findFirst({
         where: { user1Slug, user2Slug },
      });
      return follows ? true : false;
   });
var followUser = (user1Slug, user2Slug) =>
   __async(void 0, null, function* () {
      yield prisma.follow.create({
         data: { user1Slug, user2Slug },
      });
   });
var unfollowUser = (user1Slug, user2Slug) =>
   __async(void 0, null, function* () {
      yield prisma.follow.deleteMany({
         where: { user1Slug, user2Slug },
      });
   });
var updateUserInfo = (slug, data) =>
   __async(void 0, null, function* () {
      yield prisma.user.update({
         where: { slug },
         data,
      });
   });
var getUserFollowing = (slug) =>
   __async(void 0, null, function* () {
      const following = [];
      const reqFollow = yield prisma.follow.findMany({
         select: {
            user2Slug: true,
         },
         where: { user1Slug: slug },
      });
      for (let follow of reqFollow) {
         following.push(follow.user2Slug);
      }
      return following;
   });
var getFollowSuggestions = (slug) =>
   __async(void 0, null, function* () {
      const following = yield getUserFollowing(slug);
      const followingPlusMe = [...following, slug];
      const suggestions = yield prisma.$queryRaw`
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
   });
// Annotate the CommonJS export names for ESM import in node:
0 &&
   (module.exports = {
      checkIfFollows,
      createUser,
      findPostsByUser,
      findUserByEmail,
      findUserBySlug,
      followUser,
      getFollowSuggestions,
      getUserFollowersCount,
      getUserFollowing,
      getUserFollowingCount,
      getUserPostsCount,
      unfollowUser,
      updateUserInfo,
   });
