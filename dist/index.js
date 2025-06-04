"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const root_route_1 = require("./routes/root.route");
const config_1 = require("./config");
const middlewares_1 = require("./middlewares");
// configurations
const app = (0, express_1.default)();
const PORT = Number(env_1.CONFIG.PORT);
// middlewares
app.use((0, cors_1.default)({
    origin: [env_1.CONFIG.FRONTEND_ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
// routes
app.get("/", (_req, res) => {
    res.status(200).send("✔️ API Server is running!");
});
app.use("/", root_route_1.rootRouter);
// error handler middleware
app.use(middlewares_1.errorHandler);
// server listening
app.listen(PORT, () => {
    console.log(`****Server started*****`);
    console.log(`URL: http://localhost:${PORT}`);
    (0, config_1.connectToDatabase)();
});
exports.default = app;
//# sourceMappingURL=index.js.map