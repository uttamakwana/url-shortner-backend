"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const global_validation_1 = require("./global.validation");
exports.registerSchema = zod_1.z.object({
    name: global_validation_1.zNameSchema,
    email: global_validation_1.zEmailSchema,
    password: global_validation_1.zPasswordSchema,
    userAgent: global_validation_1.zUserAgentSchema
});
exports.loginSchema = zod_1.z.object({
    email: global_validation_1.zEmailSchema,
    password: global_validation_1.zPasswordSchema,
    userAgent: global_validation_1.zUserAgentSchema
});
//# sourceMappingURL=user.validation.js.map