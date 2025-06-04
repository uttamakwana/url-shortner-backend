"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.urlRouter = (0, express_1.Router)();
// short url
exports.urlRouter.post("/", auth_middleware_1.isAuthenticated, controllers_1.createShortUrlController);
exports.urlRouter.get("/", auth_middleware_1.isAuthenticated, controllers_1.getAllUrlsControllers);
exports.urlRouter.get("/:nanoId", controllers_1.redirectToOriginalUrlController);
// redirect to original url
//# sourceMappingURL=url.route.js.map