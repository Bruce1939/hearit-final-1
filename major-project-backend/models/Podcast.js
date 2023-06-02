import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const podcastModel = new Schema(
    {
        audio: {
            type: String,
        },
        image: {
            type: String,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        keywords: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Podcast = model("Podcast", podcastModel);

export default Podcast;
