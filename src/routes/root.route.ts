import { Router } from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { urlRouter } from "./url.route";

export const rootRouter = Router();

// auth
rootRouter.use("/auth", authRouter);
// user
rootRouter.use("/users", userRouter);
// url
rootRouter.use("/urls", urlRouter);