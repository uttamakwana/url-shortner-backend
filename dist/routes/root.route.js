"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const user_route_1 = require("./user.route");
const url_route_1 = require("./url.route");
exports.rootRouter = (0, express_1.Router)();
// auth
exports.rootRouter.use("/auth", auth_route_1.authRouter);
// user
exports.rootRouter.use("/users", user_route_1.userRouter);
// url
exports.rootRouter.use("/urls", url_route_1.urlRouter);
//# sourceMappingURL=root.route.js.map