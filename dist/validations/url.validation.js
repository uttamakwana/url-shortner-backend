"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToOriginalUrlSchema = exports.createShortUrlSchema = void 0;
const zod_1 = require("zod");
const global_validation_1 = require("./global.validation");
exports.createShortUrlSchema = zod_1.z.object({
    originalUrl: global_validation_1.zUrlSchema,
    userId: global_validation_1.zIdSchema
});
exports.redirectToOriginalUrlSchema = zod_1.z.object({
    nanoId: global_validation_1.zStringSchema,
});
//# sourceMappingURL=url.validation.js.map