import { z } from "zod";

const zEnvStringSchema = z.string().nonempty();

const envSchema = z.object({
    NODE_ENV: zEnvStringSchema,
    PORT: zEnvStringSchema,
    MONGO_URI: zEnvStringSchema,
    JWT_REFRESH_TOKEN_KEY: zEnvStringSchema,
    JWT_ACCESS_TOKEN_KEY: zEnvStringSchema,
    FRONTEND_ORIGIN: zEnvStringSchema
});

export const CONFIG = envSchema.parse(process.env);