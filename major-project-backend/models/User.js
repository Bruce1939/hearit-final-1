import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
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
            minlength: 6,
        },
        favourites: {
            type: [String],
            default: [],
        },
        role: {
            type: String,
            default: "member",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const User = model("User", userModel);

export default User;
