import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const signUpController = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        if (!name || !username || !email || !password)
            return res.json({
                error: true,
                message: "name, username, email or password cannot be empty",
            });
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.json({ error: true, message: "user already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        const userToReturn = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        return res.json({ error: false, user: userToReturn });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const logInController = async (req, res) => {
    console.log(req)
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.json({
                error: true,
                message: "Email or password cannot be empty",
            });
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ error: true, message: "user doesn't exists" });
        if (!user.isActive)
            return res.json({ error: true, message: "email not verified" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.json({ error: true, message: "invalid credentials" });
        const payload = {
            userId: user._id,
            userRole: user.role,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        const userToReturn = user._id;
        return res.json({ error: false, token, user: userToReturn });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const forgotPasswordController = async (req, res) => {
    try {
        if (!req.user) return res.json({ user: null });
        return res.json(req.user);
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { email } = req.params;
        const { password } = req.body;
        const user = await User.findOne({ email });
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            password,
        });
        return res.json({ error: false, updatedUser });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

export {
    signUpController,
    logInController,
    forgotPasswordController,
    resetPasswordController,
};
