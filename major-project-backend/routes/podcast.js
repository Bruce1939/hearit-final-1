import express from "express";
const router = express.Router();

import requiresAuth from "./../middleware/requiresAuth.js";

import {
    getPodcastsController,
    getUserPodcastsController,
    getFavouritesController,
    addPodcastController,
    deletePodcastController,
    likePodcastController,
    unlikePodcastController,
    setPodcastAudioController
} from "../controllers/podcastControllers.js";

router.get("/get-podcasts", requiresAuth, getPodcastsController);
router.get("/get-user-podcasts", requiresAuth, getUserPodcastsController);
router.get("/get-favourites", requiresAuth, getFavouritesController);
router.post("/add-podcast", requiresAuth, addPodcastController);
router.put("/audio", requiresAuth, setPodcastAudioController)
router.delete("/deleterule/:podcastid", requiresAuth, deletePodcastController);
router.put("/favourite/:podcastid", requiresAuth, likePodcastController);
router.put('/unfavourite/:podcastid', requiresAuth, unlikePodcastController)

export default router;

