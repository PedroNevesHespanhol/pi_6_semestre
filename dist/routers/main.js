"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (
   (target = mod != null ? __create(__getProtoOf(mod)) : {}),
   __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule
         ? __defProp(target, "default", { value: mod, enumerable: true })
         : target,
      mod
   )
);
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

// src/routers/main.ts
var main_exports = {};
__export(main_exports, {
   mainRouter: () => mainRouter,
});
module.exports = __toCommonJS(main_exports);
var import_express = require("express");

// src/controllers/ping.ts
var ping = (req, res) => {
   res.json({ pong: true });
};
var privatePing = (req, res) => {
   res.json({ pong: true, slug: req.userSlug });
};

// src/schemas/signup.ts
var import_zod = require("zod");
var signupSchema = import_zod.z.object({
   name: import_zod.z
      .string({ message: "Nome \xE9 obrigat\xF3rio!" })
      .min(2, "Precisa ter 2 ou mais caracteres!"),
   email: import_zod.z
      .string({ message: "E-mail \xE9 obrigat\xF3rio!" })
      .email("E-mail inv\xE1lido!"),
   password: import_zod.z
      .string({ message: "Senha \xE9 obrigat\xF3ria!" })
      .min(8, "Precisa ter 8 ou mais caracteres!"),
});

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
var findUserBySlug = (slug2) =>
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
         where: { slug: slug2 },
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
var getUserFollowingCount = (slug2) =>
   __async(void 0, null, function* () {
      const count = yield prisma.follow.count({
         where: { user1Slug: slug2 },
      });
      return count;
   });
var getUserFollowersCount = (slug2) =>
   __async(void 0, null, function* () {
      const count = yield prisma.follow.count({
         where: { user2Slug: slug2 },
      });
      return count;
   });
var getUserPostsCount = (slug2) =>
   __async(void 0, null, function* () {
      const count = yield prisma.post.count({
         where: { userSlug: slug2 },
      });
      return count;
   });
var findPostsByUser = (slug2, currentPage, perPage) =>
   __async(void 0, null, function* () {
      const posts = yield prisma.post.findMany({
         include: {
            likes: {
               select: {
                  userSlug: true,
               },
            },
         },
         where: { userSlug: slug2, commentOf: 0 },
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
var updateUserInfo = (slug2, data) =>
   __async(void 0, null, function* () {
      yield prisma.user.update({
         where: { slug: slug2 },
         data,
      });
   });
var getUserFollowing = (slug2) =>
   __async(void 0, null, function* () {
      const following = [];
      const reqFollow = yield prisma.follow.findMany({
         select: {
            user2Slug: true,
         },
         where: { user1Slug: slug2 },
      });
      for (let follow of reqFollow) {
         following.push(follow.user2Slug);
      }
      return following;
   });
var getFollowSuggestions = (slug2) =>
   __async(void 0, null, function* () {
      const following = yield getUserFollowing(slug2);
      const followingPlusMe = [...following, slug2];
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

// src/controllers/auth.ts
var import_slug = __toESM(require("slug"));
var import_bcrypt_ts = require("bcrypt-ts");

// src/utils/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var createJWT = (slug2) => {
   return import_jsonwebtoken.default.sign(
      { slug: slug2 },
      process.env.JWT_SECRET,
      {
         expiresIn: "1h",
         // O token expira em 1 hora (pode ajustar conforme necessário)
      }
   );
};
var verifyJWT = (req, res, next) => {
   const token = req.cookies["authToken"];
   if (!token) {
      return res
         .status(401)
         .json({ error: "Acesso negado! Token n\xE3o encontrado." });
   }
   import_jsonwebtoken.default.verify(
      token,
      process.env.JWT_SECRET,
      (error, decoded) =>
         __async(void 0, null, function* () {
            if (error) return res.status(401).json({ error: "Acesso negado!" });
            const user = yield findUserBySlug(decoded.slug);
            if (!user) return res.status(401).json({ error: "Acesso negado!" });
            req.userSlug = user.slug;
            next();
         })
   );
};

// src/schemas/signin.ts
var import_zod2 = require("zod");
var signinSchema = import_zod2.z.object({
   email: import_zod2.z
      .string({ message: "E-mail \xE9 obrigat\xF3rio!" })
      .email("E-mail inv\xE1lido!"),
   password: import_zod2.z
      .string({ message: "Senha \xE9 obrigat\xF3ria!" })
      .min(8, "Precisa ter 8 ou mais caracteres!"),
});

// src/controllers/auth.ts
var signup = (req, res) =>
   __async(void 0, null, function* () {
      const safeData = signupSchema.safeParse(req.body);
      if (!safeData.success) {
         return res.json({ error: safeData.error.flatten().fieldErrors });
      }
      const hasEmail = yield findUserByEmail(safeData.data.email);
      if (hasEmail) {
         return res.json({ error: "E-mail j\xE1 existe!" });
      }
      let genSlug = true;
      let userSlug = (0, import_slug.default)(safeData.data.name);
      while (genSlug) {
         const hasSlug = yield findUserBySlug(userSlug);
         if (hasSlug) {
            let slugSuffix = Math.floor(Math.random() * 999999).toString();
            userSlug = (0, import_slug.default)(
               safeData.data.name + slugSuffix
            );
         } else {
            genSlug = false;
         }
      }
      const hashPassword = yield (0, import_bcrypt_ts.hash)(
         safeData.data.password,
         10
      );
      const newUser = yield createUser({
         slug: userSlug,
         name: safeData.data.name,
         email: safeData.data.email,
         password: hashPassword,
      });
      const token = createJWT(userSlug);
      res.cookie("authToken", token, {
         httpOnly: true,
         // Não acessível via JavaScript
         secure: process.env.NODE_ENV === "production",
         // Só enviar em HTTPS, em produção
         maxAge: 36e5,
         // Token expira após 1 hora (1 hora = 3600000 ms)
         sameSite: "strict",
         // Impede que o cookie seja enviado em requisições cross-site
      });
      res.status(201).json({
         user: {
            name: newUser.name,
            slug: newUser.slug,
            avatar: newUser.avatar,
         },
      });
   });
var signin = (req, res) =>
   __async(void 0, null, function* () {
      const safeData = signinSchema.safeParse(req.body);
      if (!safeData.success) {
         return res.json({ error: safeData.error.flatten().fieldErrors });
      }
      const user = yield findUserByEmail(safeData.data.email);
      if (!user) return res.status(401).json({ error: "Acesso negado!" });
      const verifyPass = yield (0, import_bcrypt_ts.compare)(
         safeData.data.password,
         user.password
      );
      if (!verifyPass) return res.status(401).json({ error: "Acesso negado!" });
      const token = createJWT(user.slug);
      res.cookie("authToken", token, {
         httpOnly: true,
         // Não acessível via JavaScript
         secure: process.env.NODE_ENV === "production",
         // Só enviar em HTTPS, em produção
         maxAge: 36e5,
         // Token expira após 1 hora (1 hora = 3600000 ms)
         sameSite: "strict",
         // Impede que o cookie seja enviado em requisições cross-site
      });
      res.status(200).json({
         user: {
            name: user.name,
            slug: user.slug,
            avatar: user.avatar,
         },
      });
   });

// src/schemas/add-post.ts
var import_zod3 = require("zod");
var addPostSchema = import_zod3.z.object({
   body: import_zod3.z.string({ message: "Precisa enviar um corpo!" }),
   comment: import_zod3.z.string().optional(),
});

// src/services/post.ts
var findPost = (id) =>
   __async(void 0, null, function* () {
      const post = yield prisma.post.findFirst({
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
         where: { id },
      });
      if (post) {
         post.user.avatar = getPublicURL(post.user.avatar);
         return post;
      }
      return null;
   });
var createPost = (slug2, body, comment) =>
   __async(void 0, null, function* () {
      const newPost = yield prisma.post.create({
         data: {
            userSlug: slug2,
            body,
            commentOf: comment != null ? comment : 0,
         },
      });
      return newPost;
   });
var findCommentsFromPost = (id) =>
   __async(void 0, null, function* () {
      const posts = yield prisma.post.findMany({
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
         where: { commentOf: id },
      });
      for (let postIndex in posts) {
         posts[postIndex].user.avatar = getPublicURL(
            posts[postIndex].user.avatar
         );
      }
      return posts;
   });
var checkIfPostIsLikedByUser = (slug2, id) =>
   __async(void 0, null, function* () {
      const isLiked = yield prisma.postLike.findFirst({
         where: {
            userSlug: slug2,
            postId: id,
         },
      });
      return isLiked ? true : false;
   });
var unlikePost = (slug2, id) =>
   __async(void 0, null, function* () {
      yield prisma.postLike.deleteMany({
         where: {
            userSlug: slug2,
            postId: id,
         },
      });
   });
var likePost = (slug2, id) =>
   __async(void 0, null, function* () {
      yield prisma.postLike.create({
         data: {
            userSlug: slug2,
            postId: id,
         },
      });
   });
var findPostFeed = (following, currentPage, perPage) =>
   __async(void 0, null, function* () {
      const posts = yield prisma.post.findMany({
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
         where: {
            userSlug: {
               in: following,
            },
            commentOf: 0,
         },
         orderBy: { createdAt: "desc" },
         skip: currentPage * perPage,
         take: perPage,
      });
      for (let postIndex in posts) {
         posts[postIndex].user.avatar = getPublicURL(
            posts[postIndex].user.avatar
         );
      }
      return posts;
   });
var findPostsByBody = (bodyContains, currentPage, perPage) =>
   __async(void 0, null, function* () {
      const posts = yield prisma.post.findMany({
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
         where: {
            body: {
               contains: bodyContains,
               mode: "insensitive",
            },
            commentOf: 0,
         },
         orderBy: { createdAt: "desc" },
         skip: currentPage * perPage,
         take: perPage,
      });
      for (let postIndex in posts) {
         posts[postIndex].user.avatar = getPublicURL(
            posts[postIndex].user.avatar
         );
      }
      return posts;
   });

// src/services/trend.ts
var addHashtag = (hashtag) =>
   __async(void 0, null, function* () {
      const hs = yield prisma.trend.findFirst({
         where: { hashtag },
      });
      if (hs) {
         yield prisma.trend.update({
            where: { id: hs.id },
            data: {
               counter: hs.counter + 1,
               updatedAt: /* @__PURE__ */ new Date(),
            },
         });
      } else {
         yield prisma.trend.create({
            data: { hashtag },
         });
      }
   });
var findTrends = () =>
   __async(void 0, null, function* () {
      const trends = yield prisma.trend.findMany({
         select: {
            hashtag: true,
            counter: true,
         },
         orderBy: {
            counter: "desc",
         },
         take: 4,
      });
      return trends;
   });

// src/controllers/post.ts
var addPost = (req, res) =>
   __async(void 0, null, function* () {
      const safeData = addPostSchema.safeParse(req.body);
      if (!safeData.success) {
         return res.json({ error: safeData.error.flatten().fieldErrors });
      }
      if (safeData.data.comment) {
         const hasCommentPost = yield findPost(parseInt(safeData.data.comment));
         if (!hasCommentPost) {
            return res.json({ error: "Post original inexistente!" });
         }
      }
      const newPost = yield createPost(
         req.userSlug,
         safeData.data.body,
         safeData.data.comment ? parseInt(safeData.data.comment) : 0
      );
      const hashtags = safeData.data.body.match(/#[a-zA-Z0-9_]+/g);
      if (hashtags) {
         for (let hashtag of hashtags) {
            if (hashtag.length >= 2) {
               yield addHashtag(hashtag);
            }
         }
      }
      res.json({ post: newPost });
   });
var getPost = (req, res) =>
   __async(void 0, null, function* () {
      const { id } = req.params;
      const post = yield findPost(parseInt(id));
      if (!post) return res.json({ error: "Post inexistente!" });
      res.json({ post });
   });
var getComments = (req, res) =>
   __async(void 0, null, function* () {
      const { id } = req.params;
      const comments = yield findCommentsFromPost(parseInt(id));
      res.json({ comments });
   });
var likeToggle = (req, res) =>
   __async(void 0, null, function* () {
      const { id } = req.params;
      const liked = yield checkIfPostIsLikedByUser(req.userSlug, parseInt(id));
      if (liked) {
         unlikePost(req.userSlug, parseInt(id));
      } else {
         likePost(req.userSlug, parseInt(id));
      }
      res.json({});
   });

// src/schemas/user-posts.ts
var import_zod4 = require("zod");
var userPostsSchema = import_zod4.z.object({
   page: import_zod4.z.coerce.number().min(0).optional(),
   // coerce, mesmo mandando como string aceita como number
});

// src/schemas/update-user.ts
var import_zod5 = require("zod");
var updateUserSchema = import_zod5.z.object({
   name: import_zod5.z
      .string({ message: "Nome obrigat\xF3rio" })
      .min(3, { message: "M;\xEDnimo 2 caracteres" })
      .optional(),
   bio: import_zod5.z.string().optional(),
   link: import_zod5.z.string().url("Precisa ser uma URL v\xE1lida").optional(),
});

// src/controllers/user.ts
var getUser = (req, res) =>
   __async(void 0, null, function* () {
      const { slug: slug2 } = req.params;
      const user = yield findUserBySlug(slug2);
      if (!user) return res.json({ error: "Usu\xE1rio inexistente!" });
      const followingCount = yield getUserFollowingCount(slug2);
      const followersCount = yield getUserFollowersCount(slug2);
      const postCount = yield getUserPostsCount(slug2);
      res.json({ user, followingCount, followersCount, postCount });
   });
var getUserPosts = (req, res) =>
   __async(void 0, null, function* () {
      const { slug: slug2 } = req.params;
      const safeData = userPostsSchema.safeParse(req.query);
      if (!safeData.success)
         return res.json({ error: safeData.error.flatten().fieldErrors });
      let perPage = 2;
      let currentPage = safeData.data.page || 0;
      const posts = yield findPostsByUser(slug2, currentPage, perPage);
      res.json({ posts, page: currentPage });
   });
var followToggle = (req, res) =>
   __async(void 0, null, function* () {
      const { slug: slug2 } = req.params;
      const me = req.userSlug;
      const hasUserToBeFollowed = yield findUserBySlug(slug2);
      if (!hasUserToBeFollowed)
         return res.json({ error: "Usu\xE1rio inexistente!" });
      const follows = yield checkIfFollows(me, slug2);
      if (!follows) {
         yield followUser(me, slug2);
         res.json({ following: true });
      } else {
         yield unfollowUser(me, slug2);
         res.json({ following: false });
      }
   });
var updateUser = (req, res) =>
   __async(void 0, null, function* () {
      const safeData = updateUserSchema.safeParse(req.body);
      if (!safeData.success)
         return res.json({ error: safeData.error.flatten().fieldErrors });
      yield updateUserInfo(req.userSlug, safeData.data);
      res.json({ message: "Sucess" });
   });

// src/schemas/feed.ts
var import_zod6 = require("zod");
var feedSchema = import_zod6.z.object({
   page: import_zod6.z.coerce.number().min(0).optional(),
});

// src/controllers/feed.ts
var getFeed = (req, res) =>
   __async(void 0, null, function* () {
      const safeData = feedSchema.safeParse(req.query);
      if (!safeData.success) {
         return res.json({ error: safeData.error.flatten().fieldErrors });
      }
      let perPage = 2;
      let currentPage = safeData.data.page || 0;
      const following = yield getUserFollowing(req.userSlug);
      const posts = yield findPostFeed(following, currentPage, perPage);
      res.json({ posts, page: currentPage });
   });

// src/schemas/search.ts
var import_zod7 = require("zod");
var searchSchema = import_zod7.z.object({
   q: import_zod7.z
      .string({ message: "Preencha a busca" })
      .min(3, "M\xEDnimo 3 caracteres"),
   page: import_zod7.z.coerce.number().min(0).optional(),
});

// src/controllers/search.ts
var searchPosts = (req, res) =>
   __async(void 0, null, function* () {
      const safeData = searchSchema.safeParse(req.query);
      if (!safeData.success) {
         return res.json({ error: safeData.error.flatten().fieldErrors });
      }
      let perPage = 2;
      let currentPage = safeData.data.page || 0;
      const posts = yield findPostsByBody(
         safeData.data.q || "",
         currentPage,
         perPage
      );
      res.json({ posts, page: currentPage });
   });

// src/controllers/trend.ts
var getTrends = (req, res) =>
   __async(void 0, null, function* () {
      const trends = yield findTrends();
      res.json({ trends });
   });

// src/controllers/suggestion.ts
var getSuggestions = (req, res) =>
   __async(void 0, null, function* () {
      const suggestions = yield getFollowSuggestions(req.userSlug);
      res.json({ users: suggestions });
   });

// src/routers/main.ts
var mainRouter = (0, import_express.Router)();
mainRouter.get("/ping", ping);
mainRouter.get("/privatePing", verifyJWT, privatePing);
mainRouter.post("/signup", signup);
mainRouter.post("/signin", signin);
mainRouter.post("/post", verifyJWT, addPost);
mainRouter.get("/post/:id", verifyJWT, getPost);
mainRouter.get("/post/:id/comment", verifyJWT, getComments);
mainRouter.post("/post/:id/like", verifyJWT, likeToggle);
mainRouter.get("/user/:slug", verifyJWT, getUser);
mainRouter.get("/user/:slug/posts", verifyJWT, getUserPosts);
mainRouter.post("/user/:slug/follow", verifyJWT, followToggle);
mainRouter.put("/user", verifyJWT, updateUser);
mainRouter.get("/feed", verifyJWT, getFeed);
mainRouter.get("/search", verifyJWT, searchPosts);
mainRouter.get("/trending", verifyJWT, getTrends);
mainRouter.get("/suggestions", verifyJWT, getSuggestions);
// Annotate the CommonJS export names for ESM import in node:
0 &&
   (module.exports = {
      mainRouter,
   });
