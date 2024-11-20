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

// src/controllers/auth.ts
var auth_exports = {};
__export(auth_exports, {
   signin: () => signin,
   signup: () => signup,
});
module.exports = __toCommonJS(auth_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 &&
   (module.exports = {
      signin,
      signup,
   });
