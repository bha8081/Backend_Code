import { Router } from "express";
import { 
    getSubscribedChannels,
    toggleSubscription,
    getUserChannelSubscribers
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { TokenExpiredError } from "jsonwebtoken";

const router = Router();

router.use(verifyJWT);

router
    .route("/c/:chennelId")
    .get(getUserChannelSubscribers)
    .post(toggleSubscription);

router
    .route("/u/:subscriberId")
    .get(getSubscribedChannels);

export default router;