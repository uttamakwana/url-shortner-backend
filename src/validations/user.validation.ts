import { z } from "zod";
import { zEmailSchema, zNameSchema, zPasswordSchema, zUserAgentSchema } from "./global.validation";

export const registerSchema = z.object({
    name: zNameSchema,
    email: zEmailSchema,
    password: zPasswordSchema,
    userAgent: zUserAgentSchema
});

export const loginSchema = z.object({
    email: zEmailSchema,
    password: zPasswordSchema,
    userAgent: zUserAgentSchema
})