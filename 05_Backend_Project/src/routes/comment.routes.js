import { Router } from "express";
import {
    deleteComment,
    updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyIsOwnerForComment } from "../middlewares/verifyOwner.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file.

router
    .route("/c/:commentId")
    .delete(verifyIsOwnerForComment, deleteComment)
    .patch(verifyIsOwnerForComment, updateComment);

export default router;