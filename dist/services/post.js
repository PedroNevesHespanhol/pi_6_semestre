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

// src/services/post.ts
var post_exports = {};
__export(post_exports, {
  checkIfPostIsLikedByUser: () => checkIfPostIsLikedByUser,
  createPost: () => createPost,
  findCommentsFromPost: () => findCommentsFromPost,
  findPost: () => findPost,
  findPostFeed: () => findPostFeed,
  findPostsByBody: () => findPostsByBody,
  likePost: () => likePost,
  unlikePost: () => unlikePost
});
module.exports = __toCommonJS(post_exports);

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
var findPostFeed = (following, currentPage, perPage) => __async(void 0, null, function* () {
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
    where: {
      userSlug: {
        in: following
      },
      commentOf: 0
    },
    orderBy: { createdAt: "desc" },
    skip: currentPage * perPage,
    take: perPage
  });
  for (let postIndex in posts) {
    posts[postIndex].user.avatar = getPublicURL(posts[postIndex].user.avatar);
  }
  return posts;
});
var findPostsByBody = (bodyContains, currentPage, perPage) => __async(void 0, null, function* () {
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
    where: {
      body: {
        contains: bodyContains,
        mode: "insensitive"
      },
      commentOf: 0
    },
    orderBy: { createdAt: "desc" },
    skip: currentPage * perPage,
    take: perPage
  });
  for (let postIndex in posts) {
    posts[postIndex].user.avatar = getPublicURL(posts[postIndex].user.avatar);
  }
  return posts;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIfPostIsLikedByUser,
  createPost,
  findCommentsFromPost,
  findPost,
  findPostFeed,
  findPostsByBody,
  likePost,
  unlikePost
});
