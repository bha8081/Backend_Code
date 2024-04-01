import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHendler } from "../utils/asyncHandler.js";
// TODO: build a healthcheck response that simply returns the Ok status as json with a message.
const healthcheck = asyncHendler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Ok, Server is healthy."));
});

export { healthcheck };