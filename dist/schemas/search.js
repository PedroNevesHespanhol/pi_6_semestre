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

// src/schemas/search.ts
var search_exports = {};
__export(search_exports, {
  searchSchema: () => searchSchema
});
module.exports = __toCommonJS(search_exports);
var import_zod = require("zod");
var searchSchema = import_zod.z.object({
  q: import_zod.z.string({ message: "Preencha a busca" }).min(3, "M\xEDnimo 3 caracteres"),
  page: import_zod.z.coerce.number().min(0).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchSchema
});
