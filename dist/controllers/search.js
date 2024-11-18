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

// src/controllers/search.ts
var search_exports = {};
__export(search_exports, {
  searchPosts: () => searchPosts
});
module.exports = __toCommonJS(search_exports);

// src/schemas/search.ts
var import_zod = require("zod");
var searchSchema = import_zod.z.object({
  q: import_zod.z.string({ message: "Preencha a busca" }).min(3, "M\xEDnimo 3 caracteres"),
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

// src/services/post.ts
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

// src/controllers/search.ts
var searchPosts = (req, res) => __async(void 0, null, function* () {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchPosts
});
