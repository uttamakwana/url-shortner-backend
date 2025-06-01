import { Router } from "express";
import { getUserController, loginController, logoutController, registerController } from "../controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";

export const userRouter = Router();

// register
userRouter.post("/register", registerController);
// login
userRouter.post("/login", loginController);
// get user
userRouter.get("/", isAuthenticated, getUserController);
// logout
userRouter.get("/logout", isAuthenticated, logoutController);