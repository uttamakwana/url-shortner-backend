import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { ACCESS_TOKEN_EXPIRES_IN, ErrorCode, REFRESH_TOKEN_EXPIRES_IN } from "../constants";
import { Types } from "mongoose";
import { CustomError } from "../middlewares";

type JwtRefreshTokenPayload = {
    sessionId: Types.ObjectId;
}

type JwtAccessTokenPayload = {
    userId: Types.ObjectId;
    sessionId: Types.ObjectId;
}

type JwtTokenOptions = jwt.SignOptions;

const commonTokenOptions: JwtTokenOptions = {
    issuer: "url-shortner",
    audience: ["web"]
}

const refreshTokenOptions: JwtTokenOptions = {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    ...commonTokenOptions
}

const accessTokenOptions: JwtTokenOptions = {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    ...commonTokenOptions
}

export const generateRefreshToken = (payload: JwtRefreshTokenPayload) => {
    const refreshToken = jwt.sign(payload, CONFIG.JWT_REFRESH_TOKEN_KEY, refreshTokenOptions);
    return refreshToken;
}

export const verifyRefreshToken = (refreshToken: string) => {
    try {
        const payload = jwt.verify(refreshToken, CONFIG.JWT_REFRESH_TOKEN_KEY) as JwtRefreshTokenPayload;
        return payload;
    } catch (error) {
        throw new CustomError(401, "Refresh token expired", ErrorCode.InvalidRefreshToken)
    }
}

export const generateAccessTokken = (payload: JwtAccessTokenPayload) => {
    const accessTokken = jwt.sign(payload, CONFIG.JWT_ACCESS_TOKEN_KEY, accessTokenOptions);
    return accessTokken;
}

export const verifyAccessTokken = (accessTokken: string) => {
    try {
        const payload = jwt.verify(accessTokken, CONFIG.JWT_ACCESS_TOKEN_KEY) as JwtAccessTokenPayload;
        return payload;
    } catch (error) {
        throw new CustomError(401, "Access token expired", ErrorCode.InvalidAccessToken)
    }
}