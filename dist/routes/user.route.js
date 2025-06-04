"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.userRouter = (0, express_1.Router)();
// register
exports.userRouter.post("/register", controllers_1.registerController);
// login
exports.userRouter.post("/login", controllers_1.loginController);
// get user
exports.userRouter.get("/", auth_middleware_1.isAuthenticated, controllers_1.getUserController);
// logout
exports.userRouter.get("/logout", auth_middleware_1.isAuthenticated, controllers_1.logoutController);
//# sourceMappingURL=user.route.js.map