"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const error_handler_middleware_1 = require("./error-handler.middleware");
exports.isAuthenticated = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (typeof accessToken !== "string" || accessToken == null || accessToken == undefined) {
        throw new error_handler_middleware_1.CustomError(401, "Unauthorized access!", "InvalidAccessToken" /* ErrorCode.InvalidAccessToken */);
    }
    const payload = (0, utils_1.verifyAccessTokken)(accessToken);
    if (!payload) {
        throw new error_handler_middleware_1.CustomError(401, "Unauthorized access!", "InvalidAccessToken" /* ErrorCode.InvalidAccessToken */);
    }
    const { userId, sessionId } = payload;
    const session = await models_1.SessionModel.findById(sessionId);
    if (!session) {
        throw new error_handler_middleware_1.CustomError(401, "Unauthorized access!", "InvalidAccessToken" /* ErrorCode.InvalidAccessToken */);
    }
    const isSessionValid = Date.now() < session.expiresAt.getTime();
    if (!isSessionValid) {
        await session.deleteOne();
        throw new error_handler_middleware_1.CustomError(401, "Unauthorized access!", "InvalidAccessToken" /* ErrorCode.InvalidAccessToken */);
    }
    req.userId = userId;
    req.sessionId = sessionId;
    next();
});
//# sourceMappingURL=auth.middleware.js.map