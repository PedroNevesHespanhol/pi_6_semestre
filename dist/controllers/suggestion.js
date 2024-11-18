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

// src/controllers/suggestion.ts
var suggestion_exports = {};
__export(suggestion_exports, {
  getSuggestions: () => getSuggestions
});
module.exports = __toCommonJS(suggestion_exports);

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
var getFollowSuggestions = (slug) => __async(void 0, null, function* () {
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
    suggestions[slugIndex].avatar = getPublicURL(suggestions[slugIndex].avatar);
  }
});

// src/controllers/suggestion.ts
var getSuggestions = (req, res) => __async(void 0, null, function* () {
  const suggestions = yield getFollowSuggestions(req.userSlug);
  res.json({ users: suggestions });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSuggestions
});
