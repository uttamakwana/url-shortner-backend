import { Router } from "express";
import { createShortUrlController, getAllUrlsControllers, redirectToOriginalUrlController } from "../controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";

export const urlRouter = Router();

// short url
urlRouter.post("/", isAuthenticated, createShortUrlController)
urlRouter.get("/", isAuthenticated, getAllUrlsControllers)
urlRouter.get("/:nanoId", redirectToOriginalUrlController)
// redirect to original url