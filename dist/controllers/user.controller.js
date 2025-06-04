"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.getUserController = exports.loginController = exports.registerController = void 0;
const constants_1 = require("../constants");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const utils_1 = require("../utils");
const validations_1 = require("../validations");
// register
exports.registerController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    // takes input from request
    const input = validations_1.registerSchema.parse({ ...req.body, userAgent: req.headers["user-agent"] });
    // destruct from the input
    const { name, email, password, userAgent } = input;
    // query database to findout user exists
    const existedUser = await models_1.UserModel.findOne({ email });
    if (existedUser) {
        throw new middlewares_1.CustomError(400, "User already exists!");
    }
    // create new user
    const user = await models_1.UserModel.create({ name, email, password });
    const userId = user._id;
    // create a new session for that particular user
    const session = await models_1.SessionModel.create({ userId, userAgent });
    const sessionId = session._id;
    // generate refresh token and set in the cookies
    const refreshToken = (0, utils_1.generateRefreshToken)({ sessionId });
    const accessToken = (0, utils_1.generateAccessTokken)({ userId, sessionId });
    (0, utils_1.setRefreshTokenCookie)(res, refreshToken);
    res.status(constants_1.CREATED).json({ success: true, message: "Registration successfull!", data: { accessToken } });
});
// login
exports.loginController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    // take input from request
    const input = validations_1.loginSchema.parse({ ...req.body, userAgent: req.headers["user-agent"] });
    const { email, password, userAgent } = input;
    // check if user exists
    const existedUser = await models_1.UserModel.findOne({ email });
    if (!existedUser) {
        throw new middlewares_1.CustomError(400, "Invalid credentials!");
    }
    // compare password
    const hashedPassword = existedUser.password;
    const isPasswordCorrect = await (0, utils_1.comparePassword)(password, hashedPassword);
    if (!isPasswordCorrect) {
        throw new middlewares_1.CustomError(400, "Invalid credentials!");
    }
    ;
    const userId = existedUser._id;
    // create new session
    const session = await models_1.SessionModel.create({ userId, userAgent });
    const sessionId = session._id;
    // generate refresh token
    const refreshToken = (0, utils_1.generateRefreshToken)({ sessionId });
    const accessToken = (0, utils_1.generateAccessTokken)({ userId, sessionId });
    const user = {
        _id: userId,
        name: existedUser.name,
        email: existedUser.email,
        createdAt: existedUser.createdAt,
        updatedAt: existedUser.updatedAt,
    };
    (0, utils_1.setRefreshTokenCookie)(res, refreshToken).status(constants_1.OK).json({ success: true, message: "Login successfull!", data: { accessToken, user } });
});
exports.getUserController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const userId = req.userId;
    const existedUser = await models_1.UserModel.findById(userId);
    if (!existedUser) {
        throw new middlewares_1.CustomError(404, "Invalid credentials!");
    }
    const user = {
        _id: existedUser._id,
        name: existedUser.name,
        email: existedUser.email,
        createdAt: existedUser.createdAt,
        updatedAt: existedUser.updatedAt
    };
    res.status(constants_1.OK).json({ success: true, message: "User retrieved successfully!", data: { user } });
});
exports.logoutController = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const userId = req.userId;
    // find session
    await models_1.SessionModel.findOneAndDelete({ userId });
    res.clearCookie("refreshToken", constants_1.cookieOptions).status(200).json({ success: true, message: "Logout successfully!" });
});
//# sourceMappingURL=user.controller.js.map