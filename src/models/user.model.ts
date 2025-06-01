import mongoose from "mongoose";
import { USER_MODEL } from "../constants";
import { hashPassword } from "../utils";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hashPassword(this.password);
    next();
})

export const UserModel = mongoose.model(USER_MODEL, UserSchema);