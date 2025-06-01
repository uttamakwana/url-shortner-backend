import { Router } from "express";
import { refreshAccessTokenController } from "../controllers";

export const authRouter = Router();

// refresh the access token
authRouter.get("/refresh-access-token", refreshAccessTokenController)