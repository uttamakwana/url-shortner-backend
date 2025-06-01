import bcrypt from "bcrypt";
import { cookieOptions, NANO_ID_SIZE, SALT_ROUND } from "../constants";
import { Response } from "express";
import { nanoid } from "nanoid";

export const hashPassword = async (pwd: string) => await bcrypt.hash(pwd, SALT_ROUND);
export const comparePassword = async(pwd: string, hashedPassword: string) => await bcrypt.compare(pwd, hashedPassword)

export const setAccessTokenCookie = (res: Response, token: string) => res.cookie("accessToken", token)
export const setRefreshTokenCookie = (res: Response, token: string) => res.cookie("refreshToken", token, cookieOptions)

export const generateNanoId = (size = NANO_ID_SIZE) => nanoid(size);