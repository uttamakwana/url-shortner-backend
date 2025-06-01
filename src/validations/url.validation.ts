import { z } from "zod";
import { zIdSchema, zStringSchema, zUrlSchema } from "./global.validation";

export const createShortUrlSchema = z.object({
    originalUrl: zUrlSchema,
    userId: zIdSchema
});

export const redirectToOriginalUrlSchema = z.object({
    nanoId: zStringSchema,
})