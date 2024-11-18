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

// src/services/trend.ts
var trend_exports = {};
__export(trend_exports, {
  addHashtag: () => addHashtag,
  findTrends: () => findTrends
});
module.exports = __toCommonJS(trend_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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
var findTrends = () => __async(void 0, null, function* () {
  const trends = yield prisma.trend.findMany({
    select: {
      hashtag: true,
      counter: true
    },
    orderBy: {
      counter: "desc"
    },
    take: 4
  });
  return trends;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addHashtag,
  findTrends
});
