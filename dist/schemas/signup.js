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

// src/schemas/signup.ts
var signup_exports = {};
__export(signup_exports, {
  signupSchema: () => signupSchema
});
module.exports = __toCommonJS(signup_exports);
var import_zod = require("zod");
var signupSchema = import_zod.z.object({
  name: import_zod.z.string({ message: "Nome \xE9 obrigat\xF3rio!" }).min(2, "Precisa ter 2 ou mais caracteres!"),
  email: import_zod.z.string({ message: "E-mail \xE9 obrigat\xF3rio!" }).email("E-mail inv\xE1lido!"),
  password: import_zod.z.string({ message: "Senha \xE9 obrigat\xF3ria!" }).min(8, "Precisa ter 8 ou mais caracteres!")
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signupSchema
});
