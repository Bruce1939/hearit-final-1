import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from 'dotenv';
dotenv.config();

const requiresAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) return res.json({ error: "unauthorized" });
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(userId);
            const newuser = {
                userId: user._id,
                username: user.username,
                role: user.role,
            };
            req.user = newuser;
            next();
        } else {
            return res.json({ error: "unauthorized" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
};

export default requiresAuth;
