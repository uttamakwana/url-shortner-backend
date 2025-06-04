"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessTokken = exports.generateAccessTokken = exports.verifyRefreshToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const constants_1 = require("../constants");
const middlewares_1 = require("../middlewares");
const commonTokenOptions = {
    issuer: "url-shortner",
    audience: ["web"]
};
const refreshTokenOptions = {
    expiresIn: constants_1.REFRESH_TOKEN_EXPIRES_IN,
    ...commonTokenOptions
};
const accessTokenOptions = {
    expiresIn: constants_1.ACCESS_TOKEN_EXPIRES_IN,
    ...commonTokenOptions
};
const generateRefreshToken = (payload) => {
    const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.CONFIG.JWT_REFRESH_TOKEN_KEY, refreshTokenOptions);
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (refreshToken) => {
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, config_1.CONFIG.JWT_REFRESH_TOKEN_KEY);
        return payload;
    }
    catch (error) {
        throw new middlewares_1.CustomError(401, "Refresh token expired", "InvalidRefreshToken" /* ErrorCode.InvalidRefreshToken */);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const generateAccessTokken = (payload) => {
    const accessTokken = jsonwebtoken_1.default.sign(payload, config_1.CONFIG.JWT_ACCESS_TOKEN_KEY, accessTokenOptions);
    return accessTokken;
};
exports.generateAccessTokken = generateAccessTokken;
const verifyAccessTokken = (accessTokken) => {
    try {
        const payload = jsonwebtoken_1.default.verify(accessTokken, config_1.CONFIG.JWT_ACCESS_TOKEN_KEY);
        return payload;
    }
    catch (error) {
        throw new middlewares_1.CustomError(401, "Access token expired", "InvalidAccessToken" /* ErrorCode.InvalidAccessToken */);
    }
};
exports.verifyAccessTokken = verifyAccessTokken;
//# sourceMappingURL=jwt.util.js.map