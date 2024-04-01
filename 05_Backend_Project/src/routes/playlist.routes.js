import { Router } from "express";
import { 
    addVideoToPlaylist ,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatedPlaylist,
} from "../controllers/playlist.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyIsOwnerForPlaylist } from "../middlewares/verifyOwner.middleware";

const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .post(createPlaylist)

router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(verifyIsOwnerForPlaylist, updatedPlaylist)
    .delete(verifyIsOwnerForPlaylist, deletePlaylist);

router
    .route("/add/:videoId/:playlistId")
    .patch(verifyIsOwnerForPlaylist, addVideoToPlaylist);

router
    .route("/remove/:videoId/:playlistId")
    .patch(verifyIsOwnerForPlaylist, removeVideoFromPlaylist);

router
    .route("/user/:userId").get(getUserPlaylists);

export default router;