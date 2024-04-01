import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchHandler } from "../utils/asyncHandler.js";

// TODO: Get the channel stats like total video views, total subscribers, total videos, total like etc.
const getChannelStats = asynchHandler(async (req, res) => {
    const totalVideoViews = await Video.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(req.user._id) } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const totalSubscribers = await Subscription.countDocuments({ channel: req.user._id });

    const totalVideos = await Video.countDocuments({ owner: req.user._id });

    const totalLikes = await Like.countDocuments({ video: { $in: await Video.find({ owner: req.user._id}, "_id") } });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { totalVideoViews, totalSubscribers, totalVideos, totalLikes },
                "Channel stats Fetched Successfully"
            )
        );

});

// TODO: Get All The Videos Uploaded By The Channel.
const getChannelVideo = asynchHandler(async (req, res) => {
    const videos = await Video.find({
        owner: req.user._id
    });

    if (!videos) {
        throw new ApiError(500, "Something went wrong while fetching videos of user.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos of Channel Fetched Successfully"));
});

export { getChannelStats, getChannelVideo };