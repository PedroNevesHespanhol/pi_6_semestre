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

// src/controllers/feed.ts
var feed_exports = {};
__export(feed_exports, {
  getFeed: () => getFeed
});
module.exports = __toCommonJS(feed_exports);

// src/schemas/feed.ts
var import_zod = require("zod");
var feedSchema = import_zod.z.object({
  page: import_zod.z.coerce.number().min(0).optional()
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
var getUserFollowing = (slug) => __async(void 0, null, function* () {
  const following = [];
  const reqFollow = yield prisma.follow.findMany({
    select: {
      user2Slug: true
    },
    where: { user1Slug: slug }
  });
  for (let follow of reqFollow) {
    following.push(follow.user2Slug);
  }
  return following;
});

// src/services/post.ts
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

// src/controllers/feed.ts
var getFeed = (req, res) => __async(void 0, null, function* () {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFeed
});
