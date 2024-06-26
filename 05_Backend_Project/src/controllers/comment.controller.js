import mongoose, { isValidObjectId } from "mongoose";
import {Comment} from "../models/comment.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!videoId?.trim()) {
        throw new ApiError(400, "videoId is missing")
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is not valid")
    }

    const comments = await Comment.find({ video: videoId })
    .skip((page - 1) * limit)
    .limit(limit)

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments Fetched Successfully"))
});

// TODO: add a comment to a video
const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId?.trim()) {
        throw new ApiError(400, "videoId is missing")
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is not valid")
    }
    const { content } = req.body
    if (!content) {
        throw new ApiError(400, "All fiedl are required")
    }

    // Saving data in DB
    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id,
    });

    const createdComment = await Comment.findById(comment._id)

    if (!createdComment) {
        throw new ApiError(500, "Something went wrong while uploading Comment")
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, createdComment, "Comment Uploaded Successfully")
      )

});

// TODO: update a Comment
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId?.trim()) {
        throw new ApiError(400, "commentId is missing");
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is not valid")
    }

    const { content } = req.body
    if (!content) {
        throw new ApiError(400, "All field are required!")
    }

    Comment.findOneAndUpdate({ _id: commentId }, {});
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content,
            },
        },
        { new: true }
    )

    if (!updateComment) {
        throw new ApiError(500, "Something went wrong while updating Comment")
    }

    return res
      .status(201)
      .json(new ApiResponse(201, updatedComment, "Comment Updated Successfully"))

});

// TODO: delete a comment.
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId?.trim()) {
        throw new ApiError(400, "commentId is missing")
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is not valid")
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId)

    if (!deletedComment) {
        throw new ApiError(500, "Something went wrong while deleting Comment")
    }

    return res
      .status(200)
      .json(new ApiResponse(201, {}, "Comment Deleted Successfully"))
});

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
};