import mongoose from "mongoose";
import { DATE_AFTER_THIRTY_DAYS_FROM_NOW, SESSION_MODEL, USER_MODEL } from "../constants";

const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL,
        required: true
    },
    userAgent: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: DATE_AFTER_THIRTY_DAYS_FROM_NOW
    }
}, { timestamps: true });

export const SessionModel = mongoose.model(SESSION_MODEL, SessionSchema);