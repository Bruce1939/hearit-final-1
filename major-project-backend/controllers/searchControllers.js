import Podcast from "./../models/Podcast.js";

const searchPodcastsController = async (req, res) => {
    const { title } = req.body;
    try {
        const podcasts = await Podcast.find({ title });
        return res.json({ error: false, podcasts });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
};

export {
    searchPodcastsController,
};
