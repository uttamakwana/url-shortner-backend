"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUserAgentSchema = exports.zIdSchema = exports.zUrlSchema = exports.zNameSchema = exports.zPasswordSchema = exports.zEmailSchema = exports.zStringSchema = void 0;
const zod_1 = require("zod");
exports.zStringSchema = zod_1.z.string();
exports.zEmailSchema = zod_1.z.string().email();
exports.zPasswordSchema = zod_1.z.string();
exports.zNameSchema = zod_1.z.string();
exports.zUrlSchema = zod_1.z.string().url();
exports.zIdSchema = zod_1.z.string();
exports.zUserAgentSchema = zod_1.z.string();
//# sourceMappingURL=global.validation.js.map