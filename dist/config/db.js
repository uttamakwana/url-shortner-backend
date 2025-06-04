"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectToDatabase = async () => {
    try {
        const MONGO_URI = env_1.CONFIG.MONGO_URI;
        const response = await mongoose_1.default.connect(MONGO_URI);
        console.log(`*****Database connection successfull*****`);
        console.log(`Host: ${response.connection.host}`);
        console.log(`Name: ${response.connection.name}`);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map