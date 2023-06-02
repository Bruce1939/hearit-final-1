import express from "express";
const router = express.Router();

import {
    signUpController,
    logInController,
    forgotPasswordController,
    resetPasswordController,
} from './../controllers/authControllers.js';

router.post("/signup", signUpController);
router.post("/login", logInController);
// router.post('/verify-account/:email', verifyAccount);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;
