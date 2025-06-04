"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const UrlSchema = new mongoose_1.default.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: constants_1.USER_MODEL,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.UrlModel = mongoose_1.default.model(constants_1.URL_MODEL, UrlSchema);
//# sourceMappingURL=url.model.js.map