import { cookieOptions, CREATED, OK } from "../constants";
import { CustomError } from "../middlewares";
import { SessionModel, UserModel } from "../models";
import { asyncHandler, comparePassword, generateAccessTokken, generateRefreshToken, setRefreshTokenCookie } from "../utils";
import { loginSchema, registerSchema } from "../validations";

// register
export const registerController = asyncHandler(async (req, res, next) => {
    // takes input from request
    const input = registerSchema.parse({ ...req.body, userAgent: req.headers["user-agent"] });
    // destruct from the input
    const { name, email, password, userAgent } = input;

    // query database to findout user exists
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
        throw new CustomError(400, "User already exists!");
    }

    // create new user
    const user = await UserModel.create({ name, email, password });
    const userId = user._id;

    // create a new session for that particular user
    const session = await SessionModel.create({ userId, userAgent });
    const sessionId = session._id;

    // generate refresh token and set in the cookies
    const refreshToken = generateRefreshToken({ sessionId });
    const accessToken = generateAccessTokken({ userId, sessionId });
    setRefreshTokenCookie(res, refreshToken)
    res.status(CREATED).json({ success: true, message: "Registration successfull!", data: { accessToken } })
});


// login
export const loginController = asyncHandler(async (req, res, next) => {
    // take input from request
    const input = loginSchema.parse({ ...req.body, userAgent: req.headers["user-agent"] });
    const { email, password, userAgent } = input;

    // check if user exists
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
        throw new CustomError(400, "Invalid credentials!");
    }

    // compare password
    const hashedPassword = existedUser.password;
    const isPasswordCorrect = await comparePassword(password, hashedPassword);
    if (!isPasswordCorrect) {
        throw new CustomError(400, "Invalid credentials!");
    };

    const userId = existedUser._id;

    // create new session
    const session = await SessionModel.create({ userId, userAgent });
    const sessionId = session._id;

    // generate refresh token
    const refreshToken = generateRefreshToken({ sessionId });
    const accessToken = generateAccessTokken({ userId, sessionId });

    const user = {
        _id: userId,
        name: existedUser.name,
        email: existedUser.email,
        createdAt: existedUser.createdAt,
        updatedAt: existedUser.updatedAt,
    }

    setRefreshTokenCookie(res, refreshToken).status(OK).json({ success: true, message: "Login successfull!", data: { accessToken, user } });
})

export const getUserController = asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    const existedUser = await UserModel.findById(userId);

    if (!existedUser) {
        throw new CustomError(404, "Invalid credentials!");
    }

    const user = {
        _id: existedUser._id,
        name: existedUser.name,
        email: existedUser.email,
        createdAt: existedUser.createdAt,
        updatedAt: existedUser.updatedAt
    }

    res.status(OK).json({ success: true, message: "User retrieved successfully!", data: { user } })
})

export const logoutController = asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    // find session
    await SessionModel.findOneAndDelete({ userId });

    res.clearCookie("refreshToken", cookieOptions).status(200).json({ success: true, message: "Logout successfully!" });
});