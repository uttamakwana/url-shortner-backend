import { z } from "zod";

export const zStringSchema = z.string();

export const zEmailSchema = z.string().email();
export const zPasswordSchema = z.string();
export const zNameSchema = z.string();
export const zUrlSchema = z.string().url();
export const zIdSchema = z.string();
export const zUserAgentSchema = z.string();