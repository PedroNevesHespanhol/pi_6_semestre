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

// src/schemas/update-user.ts
var update_user_exports = {};
__export(update_user_exports, {
  updateUserSchema: () => updateUserSchema
});
module.exports = __toCommonJS(update_user_exports);
var import_zod = require("zod");
var updateUserSchema = import_zod.z.object({
  name: import_zod.z.string({ message: "Nome obrigat\xF3rio" }).min(3, { message: "M;\xEDnimo 2 caracteres" }).optional(),
  bio: import_zod.z.string().optional(),
  link: import_zod.z.string().url("Precisa ser uma URL v\xE1lida").optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateUserSchema
});
