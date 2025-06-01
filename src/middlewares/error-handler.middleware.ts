import { ErrorRequestHandler, Response } from "express";
import { type THttpStatusCode } from "../types";
import { BAD_REQUEST, ErrorCode, INTERNAL_SERVER_ERROR } from "../constants";
import { ZodError } from "zod";

export class CustomError extends Error {
    constructor(public statusCode: THttpStatusCode, public message: string, public errorCode?: ErrorCode) {
        super(message);
    }
}

const handleZodError = (res: Response, err: ZodError) => {
    const errors = err.issues.map((issue) => ({ path: issue.path.join(", "), message: issue.message }));
    res.status(BAD_REQUEST).json({ success: false, message: "Input validation error!", errorCode: ErrorCode.ZodError, errors })
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err, err.message);
    if(typeof err.message === "string" && err.message.includes("token expired") && err instanceof CustomError) {
        res.status(401).json({ success: false, message: err.message, errorCode: err.errorCode })
    }

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ success: false, message: err.message, errorCode: err.errorCode })
    }

    if (err instanceof ZodError) {
        handleZodError(res, err);
    }

    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: "Something went wrong!" });
}