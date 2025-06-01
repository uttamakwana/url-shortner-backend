import { CustomError } from "../middlewares";
import { SessionModel, UserModel } from "../models";
import { asyncHandler, generateAccessTokken, verifyRefreshToken } from "../utils";

export const refreshAccessTokenController = asyncHandler(async (req, res, next) => {
    // get the refresh token from request headers
    const refreshToken = req.cookies.refreshToken;
    if (typeof refreshToken !== "string" || refreshToken == null || refreshToken == undefined) {
        throw new CustomError(401, "Invalid refresh token!");
    }

    // verify refresh token and extract payload
    const payload = verifyRefreshToken(refreshToken);
    const sessionId = payload.sessionId;
    if (!sessionId) {
        throw new CustomError(401, "Invalid refresh token!");
    }

    // find a relative session attached with refreshToken
    const session = await SessionModel.findById(sessionId);
    if (!session) {
        throw new CustomError(401, "Invalid refresh token!");
    }

    // check whether session is not expired
    const isSessionValid = Date.now() < session.expiresAt.getTime();
    if (!isSessionValid) {
        await session.deleteOne();
        throw new CustomError(401, "Invalid refresh token!");
    }

    // generate new access token
    const accessToken = generateAccessTokken({ userId: session.userId, sessionId });
    if (!accessToken) {
        throw new CustomError(500, "Failed to generate access token!");
    }

    const userId = session.userId;
    const existedUser = await UserModel.findById(userId);

    if (!existedUser) {
        throw new CustomError(401, "Invalid refresh token!");
    }
    const user = {
        _id: existedUser,
        name: existedUser.name,
        email: existedUser.email,
        createdAt: existedUser.createdAt,
        updatedAt: existedUser.updatedAt,
    }


    res.status(200).json({ success: true, message: "New access token generated successfully!", data: { accessToken, user } })
});