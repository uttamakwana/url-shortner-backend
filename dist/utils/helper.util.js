"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNanoId = exports.setRefreshTokenCookie = exports.setAccessTokenCookie = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../constants");
const nanoid_1 = require("nanoid");
const hashPassword = async (pwd) => await bcrypt_1.default.hash(pwd, constants_1.SALT_ROUND);
exports.hashPassword = hashPassword;
const comparePassword = async (pwd, hashedPassword) => await bcrypt_1.default.compare(pwd, hashedPassword);
exports.comparePassword = comparePassword;
const setAccessTokenCookie = (res, token) => res.cookie("accessToken", token);
exports.setAccessTokenCookie = setAccessTokenCookie;
const setRefreshTokenCookie = (res, token) => res.cookie("refreshToken", token, constants_1.cookieOptions);
exports.setRefreshTokenCookie = setRefreshTokenCookie;
const generateNanoId = (size = constants_1.NANO_ID_SIZE) => (0, nanoid_1.nanoid)(size);
exports.generateNanoId = generateNanoId;
//# sourceMappingURL=helper.util.js.map