"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.API_ENDPOINT = exports.isProduction = exports.NANO_ID_SIZE = exports.SALT_ROUND = exports.INTERNAL_SERVER_ERROR = exports.TOO_MANY_REQUESTS = exports.UNPROCESSABLE_CONTENT = exports.CONFLICT = exports.NOT_FOUND = exports.FORBIDDEN = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.CREATED = exports.OK = exports.ACCESS_TOKEN_EXPIRES_IN = exports.REFRESH_TOKEN_EXPIRES_IN = exports.DATE_AFTER_THIRTY_DAYS_FROM_NOW = exports.SESSION_MODEL = exports.URL_MODEL = exports.USER_MODEL = void 0;
const config_1 = require("../config");
// models name
exports.USER_MODEL = "user";
exports.URL_MODEL = "url";
exports.SESSION_MODEL = "session";
// dates
exports.DATE_AFTER_THIRTY_DAYS_FROM_NOW = new Date(Date.now() + 30 * 24 * 60 * 1000);
exports.REFRESH_TOKEN_EXPIRES_IN = "30d";
exports.ACCESS_TOKEN_EXPIRES_IN = "15m";
// http status code
exports.OK = 200;
exports.CREATED = 201;
exports.BAD_REQUEST = 400;
exports.UNAUTHORIZED = 401;
exports.FORBIDDEN = 403;
exports.NOT_FOUND = 404;
exports.CONFLICT = 409;
exports.UNPROCESSABLE_CONTENT = 422;
exports.TOO_MANY_REQUESTS = 429;
exports.INTERNAL_SERVER_ERROR = 500;
// bcrypt salt round
exports.SALT_ROUND = 10;
exports.NANO_ID_SIZE = 6;
exports.isProduction = config_1.CONFIG.NODE_ENV === "production";
exports.API_ENDPOINT = exports.isProduction ? "https://inki.onrender.com" : `http://localhost:4000`;
exports.cookieOptions = {
    httpOnly: true, // Prevents JavaScript access (security!)
    secure: exports.isProduction, // Send cookie only over HTTPS in production
    sameSite: exports.isProduction ? "none" : "lax", // Allow cross-site cookies in prod (for frontend-backend on different domains)
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};
//# sourceMappingURL=global.constant.js.map