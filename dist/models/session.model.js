"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const SessionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: constants_1.USER_MODEL,
        required: true
    },
    userAgent: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: constants_1.DATE_AFTER_THIRTY_DAYS_FROM_NOW
    }
}, { timestamps: true });
exports.SessionModel = mongoose_1.default.model(constants_1.SESSION_MODEL, SessionSchema);
//# sourceMappingURL=session.model.js.map