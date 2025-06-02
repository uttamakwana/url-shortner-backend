import { CookieOptions } from "express";
import { CONFIG } from "../config";

// models name
export const USER_MODEL = "user";
export const URL_MODEL = "url";
export const SESSION_MODEL = "session";

// dates
export const DATE_AFTER_THIRTY_DAYS_FROM_NOW = new Date(Date.now() + 30 * 24 * 60 * 1000);
export const REFRESH_TOKEN_EXPIRES_IN = "30d";
export const ACCESS_TOKEN_EXPIRES_IN = "15m";

// http status code
export const OK = 200;
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const UNPROCESSABLE_CONTENT = 422;
export const TOO_MANY_REQUESTS = 429;
export const INTERNAL_SERVER_ERROR = 500;

// error enums
export const enum ErrorCode {
    InvalidAccessToken = "InvalidAccessToken",
    ZodError = "ZodError",
    InvalidRefreshToken = "InvalidRefreshToken",
}

// bcrypt salt round
export const SALT_ROUND = 10;
export const NANO_ID_SIZE = 6;

export const API_ENDPOINT = `http://localhost:4000`

export const isProduction = CONFIG.NODE_ENV === "production";

export const cookieOptions: CookieOptions = {
    httpOnly: true,                     // Prevents JavaScript access (security!)
    secure: isProduction,              // Send cookie only over HTTPS in production
    sameSite: isProduction ? "none" : "lax", // Allow cross-site cookies in prod (for frontend-backend on different domains)
    maxAge: 24 * 60 * 60 * 1000,       // 1 day
}