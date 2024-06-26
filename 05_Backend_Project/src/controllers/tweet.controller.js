import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// TODO: Create tweet.
const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    if (!content) {
        throw new ApiError(400, "All field are required.");
    }
    const tweet = await Tweet.create({
        content,
        owner: req.user._id,
    });

    const postedTweet = await Tweet.findById(tweet._id);

    if (!postedTweet) {
        throw new ApiError(500, "Something went wrong while posting tweet.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, postedTweet, "Tweet is posted successfully.")
        );

});

// TODO: Get user tweets.
const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "userId not found");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "userId is not valid");
    }

    const tweets = await Tweet.find({
        owner: userId,
    });

    if (!tweets) {
        throw new ApiError(500, "Something went wrong while fetching tweets.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, tweets, "Tweets fetched successfully")
        );
});

// TODO: update tweet
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    if (!tweetId?.trim()) {
        throw new ApiError(400, "tweet is missing.");
    }
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "tweetId is not valid");
    }
    const { content } = req.body;
    if (!content) {
        throw new ApiError(400, "All field are required!");
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content,
            },
        },
        {
            new: true
        }
    );

    if (!updatedTweet) {
        throw new ApiError(500, "Something went wrong while updating tweet")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTweet, "Tweet updated successfully")
        );
});

// TODO: delete tweet
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId?.trim()) {
        throw new ApiError(400, "tweetId is missing.");
    }
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "tweetId is not valid.");
    }

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

    if (!deletedTweet) {
        throw new ApiError(500, "Something went wrong while deleting tweet.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Tweet deleted successfully.")
        );
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}