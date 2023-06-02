import express from "express";
const router = express.Router();

import requiresAuth from "./../middleware/requiresAuth.js";

import { searchPodcastsController } from "../controllers/searchControllers.js";

router.get("/search-podcasts", requiresAuth, searchPodcastsController);

export default router;
