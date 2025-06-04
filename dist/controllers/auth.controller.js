"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenController = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const utils_1 = require("../utils");
exports.refreshAccessTokenController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    // get the refresh token from request headers
    const refreshToken = req.cookies.refreshToken;
    if (typeof refreshToken !== "string" || refreshToken == null || refreshToken == undefined) {
        throw new middlewares_1.CustomError(401, "Invalid refresh token!");
    }
    // verify refresh token and extract payload
    const payload = (0, utils_1.verifyRefreshToken)(refreshToken);
    const sessionId = payload.sessionId;
    if (!sessionId) {
        throw new middlewares_1.CustomError(401, "Invalid refresh token!");
    }
    // find a relative session attached with refreshToken
    const session = await models_1.SessionModel.findById(sessionId);
    if (!session) {
        throw new middlewares_1.CustomError(401, "Invalid refresh token!");
    }
    // check whether session is not expired
    const isSessionValid = Date.now() < session.expiresAt.getTime();
    if (!isSessionValid) {
        await session.deleteOne();
        throw new middlewares_1.CustomError(401, "Invalid refresh token!");
    }
    // generate new access token
    const accessToken = (0, utils_1.generateAccessTokken)({ userId: session.userId, sessionId });
    if (!accessToken) {
        throw new middlewares_1.CustomError(500, "Failed to generate access token!");
    }
    const userId = session.userId;
    const existedUser = await models_1.UserModel.findById(userId);
    if (!existedUser) {
        throw new middlewares_1.CustomError(401, "Invalid refresh token!");
    }
    const user = {
        _id: existedUser,
        name: existedUser.name,
        email: existedUser.email,
        createdAt: existedUser.createdAt,
        updatedAt: existedUser.updatedAt,
    };
    res.status(200).json({ success: true, message: "New access token generated successfully!", data: { accessToken, user } });
});
//# sourceMappingURL=auth.controller.js.map