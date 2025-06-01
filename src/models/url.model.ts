import mongoose from "mongoose";
import { URL_MODEL, USER_MODEL } from "../constants";

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const UrlModel = mongoose.model(URL_MODEL, UrlSchema)