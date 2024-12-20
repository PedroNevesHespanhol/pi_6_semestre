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

// src/utils/jwt.ts
var jwt_exports = {};
__export(jwt_exports, {
   createJWT: () => createJWT,
   verifyJWT: () => verifyJWT,
});
module.exports = __toCommonJS(jwt_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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

// src/utils/jwt.ts
var createJWT = (slug) => {
   return import_jsonwebtoken.default.sign({ slug }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      // O token expira em 1 hora (pode ajustar conforme necessário)
   });
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
// Annotate the CommonJS export names for ESM import in node:
0 &&
   (module.exports = {
      createJWT,
      verifyJWT,
   });
