"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const zod_1 = require("zod");
const zEnvStringSchema = zod_1.z.string().nonempty();
const envSchema = zod_1.z.object({
    NODE_ENV: zEnvStringSchema,
    PORT: zEnvStringSchema,
    MONGO_URI: zEnvStringSchema,
    JWT_REFRESH_TOKEN_KEY: zEnvStringSchema,
    JWT_ACCESS_TOKEN_KEY: zEnvStringSchema,
    FRONTEND_ORIGIN: zEnvStringSchema
});
exports.CONFIG = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map