"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.authRouter = (0, express_1.Router)();
// refresh the access token
exports.authRouter.get("/refresh-access-token", controllers_1.refreshAccessTokenController);
//# sourceMappingURL=auth.route.js.map