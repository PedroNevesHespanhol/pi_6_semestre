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

// src/schemas/feed.ts
var feed_exports = {};
__export(feed_exports, {
  feedSchema: () => feedSchema
});
module.exports = __toCommonJS(feed_exports);
var import_zod = require("zod");
var feedSchema = import_zod.z.object({
  page: import_zod.z.coerce.number().min(0).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  feedSchema
});
