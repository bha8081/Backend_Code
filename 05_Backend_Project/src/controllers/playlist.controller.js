import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// TODO: Create playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApiError(400, "All field are required!");
    }
    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id,
    });

    const createPlaylist = await Playlist.findById(playlist._id);
    if (!createPlaylist) {
        throw new ApiError(400, "Something went wrong while creating playlist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, createPlaylist, "Playlist Uploaded Successfully")
      );
});

// TODO: User Playlist
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "userId is inValid");
    }

    const playlists = await Playlist.find({
        owner: userId,
    });

    if (!playlists) {
        throw new ApiError(400, "Something went wrong while fetching playlists");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, playlists, "Playlists fetched Successfully"));
});

// TODO: get playlist by id
const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "playlistId is inValid");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(400, "Something went wrong while fetching playlist");
    }
    
    return res
      .status(200)
      .json(new ApiResponse(200, playlist, "Playlist fetched Successfully"));
});

// Add Video To Playlist.
const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "playlistId is inValid");
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is inValid");
    }

    const playlist = await Playlist.findById(playlistId);

    if(!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(400, "Video not found");
    }

    playlist.videos.push(videoId);

    // Save the updated playlist
    const updatedPlaylist = await playlist.save({ validateBeforeSave: false });

    if (!updatedPlaylist) {
        throw new ApiError(
        400,
        "Something went wrong while adding video to playlist"
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
            200,
            updatedPlaylist,
            "Video added to Playlist Successfully"
        )
      );
});

// TODO: Remove video from playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const{ playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "playlistId is inValid");
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is inValid");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(400, "Video not found");
    }

    playlist.videos.pull(videoId);

    // Save the updated playlist
    const updatedPlaylist = await playlist.save({ validateBeforeSave: false });

    if (!updatedPlaylist) {
        throw new ApiError(
            400,
            "Something went wrong while removing video from playlist"
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
            200,
            updatedPlaylist,
            "Video removed from Playlist Successfully"
        )
      );
});

// TODO: Delete playlist
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "playlistId is inValid");
    }
    const deletePlaylist = await Playlist.findByIdAndDelete(playlistId);
    if (!deletePlaylist) {
        throw new ApiError(400, "Something went wromg while deleting playlist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Playlist Deleted Successfully"));
});

// Update Playlish.
const updatedPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    // TODO: Update playlist
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "playlistId is inValid");
    }
    if (!name || !description) {
        throw new ApiError(400, "All field are required!");
    }
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name,
                description,
            },
        },
        {
            new: true,
        }
    );

    if (!updatedPlaylist) {
        throw new ApiError(400, "Something went wromg while updating playlist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedPlaylist, "Playlist Updated Successfully")
      );
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatedPlaylist,
};