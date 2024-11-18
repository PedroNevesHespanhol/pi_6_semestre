"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/post.ts
var post_exports = {};
__export(post_exports, {
  addPost: () => addPost,
  getComments: () => getComments,
  getPost: () => getPost,
  likeToggle: () => likeToggle
});
module.exports = __toCommonJS(post_exports);

// src/schemas/add-post.ts
var import_zod = require("zod");
var addPostSchema = import_zod.z.object({
  body: import_zod.z.string({ message: "Precisa enviar um corpo!" }),
  comment: import_zod.z.string().optional()
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

// src/services/post.ts
var findPost = (id) => __async(void 0, null, function* () {
  const post = yield prisma.post.findFirst({
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
  if (post) {
    post.user.avatar = getPublicURL(post.user.avatar);
    return post;
  }
  return null;
});
var createPost = (slug, body, comment) => __async(void 0, null, function* () {
  const newPost = yield prisma.post.create({
    data: {
      userSlug: slug,
      body,
      commentOf: comment != null ? comment : 0
    }
  });
  return newPost;
});
var findCommentsFromPost = (id) => __async(void 0, null, function* () {
  const posts = yield prisma.post.findMany({
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
  for (let postIndex in posts) {
    posts[postIndex].user.avatar = getPublicURL(posts[postIndex].user.avatar);
  }
  return posts;
});
var checkIfPostIsLikedByUser = (slug, id) => __async(void 0, null, function* () {
  const isLiked = yield prisma.postLike.findFirst({
    where: {
      userSlug: slug,
      postId: id
    }
  });
  return isLiked ? true : false;
});
var unlikePost = (slug, id) => __async(void 0, null, function* () {
  yield prisma.postLike.deleteMany({
    where: {
      userSlug: slug,
      postId: id
    }
  });
});
var likePost = (slug, id) => __async(void 0, null, function* () {
  yield prisma.postLike.create({
    data: {
      userSlug: slug,
      postId: id
    }
  });
});

// src/services/trend.ts
var addHashtag = (hashtag) => __async(void 0, null, function* () {
  const hs = yield prisma.trend.findFirst({
    where: { hashtag }
  });
  if (hs) {
    yield prisma.trend.update({
      where: { id: hs.id },
      data: { counter: hs.counter + 1, updatedAt: /* @__PURE__ */ new Date() }
    });
  } else {
    yield prisma.trend.create({
      data: { hashtag }
    });
  }
});

// src/controllers/post.ts
var addPost = (req, res) => __async(void 0, null, function* () {
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
var getPost = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  const post = yield findPost(parseInt(id));
  if (!post) return res.json({ error: "Post inexistente!" });
  res.json({ post });
});
var getComments = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  const comments = yield findCommentsFromPost(parseInt(id));
  res.json({ comments });
});
var likeToggle = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  const liked = yield checkIfPostIsLikedByUser(
    req.userSlug,
    parseInt(id)
  );
  if (liked) {
    unlikePost(
      req.userSlug,
      parseInt(id)
    );
  } else {
    likePost(
      req.userSlug,
      parseInt(id)
    );
  }
  res.json({});
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addPost,
  getComments,
  getPost,
  likeToggle
});
