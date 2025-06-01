import { ErrorCode } from "../constants";
import { SessionModel } from "../models";
import { asyncHandler, verifyAccessTokken } from "../utils";
import { CustomError } from "./error-handler.middleware";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (typeof accessToken !== "string" || accessToken == null || accessToken == undefined) {
        throw new CustomError(401, "Unauthorized access!", ErrorCode.InvalidAccessToken);
    }

    const payload = verifyAccessTokken(accessToken);
    if (!payload) {
        throw new CustomError(401, "Unauthorized access!", ErrorCode.InvalidAccessToken);
    }

    const { userId, sessionId } = payload;

    const session = await SessionModel.findById(sessionId);

    if (!session) {
        throw new CustomError(401, "Unauthorized access!", ErrorCode.InvalidAccessToken);
    }

    const isSessionValid = Date.now() < session.expiresAt.getTime();
    if (!isSessionValid) {
        await session.deleteOne();
        throw new CustomError(401, "Unauthorized access!", ErrorCode.InvalidAccessToken);
    }

    req.userId = userId;
    req.sessionId = sessionId;
    next();
});