"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
const constants_1 = require("../constants");
const zod_1 = require("zod");
class CustomError extends Error {
    statusCode;
    message;
    errorCode;
    constructor(statusCode, message, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorCode = errorCode;
    }
}
exports.CustomError = CustomError;
const handleZodError = (res, err) => {
    const errors = err.issues.map((issue) => ({ path: issue.path.join(", "), message: issue.message }));
    res.status(constants_1.BAD_REQUEST).json({ success: false, message: "Input validation error!", errorCode: "ZodError" /* ErrorCode.ZodError */, errors });
};
const errorHandler = (err, req, res, next) => {
    console.log(err, err.message);
    if (typeof err.message === "string" && err.message.includes("token expired") && err instanceof CustomError) {
        res.status(401).json({ success: false, message: err.message, errorCode: err.errorCode });
    }
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ success: false, message: err.message, errorCode: err.errorCode });
    }
    if (err instanceof zod_1.ZodError) {
        handleZodError(res, err);
    }
    res.status(constants_1.INTERNAL_SERVER_ERROR).json({ success: false, message: "Something went wrong!" });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map