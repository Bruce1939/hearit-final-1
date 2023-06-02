import Podcast from "../models/Podcast.js";
import User from "./../models/User.js";
import mongoose from "mongoose";

const getPodcastsController = async (req, res) => {
    try {
        console.log("headers", req.headers);
        const podcasts = await Podcast.find();
        return res.json({ error: false, podcasts });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const getFavouritesController = async (req, res) => {
    try {
        const podcasts = await Podcast.find();
        return res.json({ error: false, podcasts });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const getUserPodcastsController = async (req, res) => {
    const { userId } = req.user;
    try {
        const userPodcasts = await Podcast.find({ postedBy: userId });
        return res.json({ error: false, userPodcasts });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const addPodcastController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, audio, image, description, keywords } = req.body;
        console.log(title, audio, image, description, keywords);
        if (!title || !description)
            return res.json({
                error: true,
                message: "title or description cannot be empty",
            });
        const newPodcast = new Podcast({
            audio: req.body.audio,
            image: req.body.image,
            postedBy: userId,
            title: req.body.title,
            description: req.body.description,
            keywords: req.body.keywords,
        });

        await newPodcast.save();

        return res.json({ error: false, message: newPodcast });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const deletePodcastController = async (req, res) => {
    try {
        const { id } = req.params;
        await Podcast.findByIdAndDelete(id);
        return res.json({
            error: false,
            message: "Podcast deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const likePodcastController = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $push: {
                favourites: id,
            },
        });
        return res.json({
            error: false,
            message: "podcast liked successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const unlikePodcastController = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, {
            $pull: {
                favourites: id,
            },
        });
        return res.json({
            error: false,
            message: "podcast unliked successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

const setPodcastAudioController = async (req, res) => {
    try {
        const { id, audio } = req.body;
        const newId = new mongoose.Types.ObjectId(id);
        const podcast = await Podcast.findByIdAndUpdate(
            { _id: newId },
            { audio },
            { new: true }
        );
        return res.json({ error: false, message: podcast });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

export {
    getPodcastsController,
    getUserPodcastsController,
    addPodcastController,
    deletePodcastController,
    likePodcastController,
    unlikePodcastController,
    getFavouritesController,
    setPodcastAudioController,
};
