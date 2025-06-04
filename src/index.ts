// imports
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CONFIG } from "./config/env";
import { rootRouter } from "./routes/root.route";
import { connectToDatabase } from "./config";
import { errorHandler } from "./middlewares";
import { API_ENDPOINT } from "./constants";

// configurations
const app = express();
const PORT = Number(CONFIG.PORT)

// middlewares
app.use(cors({
    origin: [CONFIG.FRONTEND_ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// routes
app.get("/", (_req, res) => {
  res.status(200).send("✔️ API Server is running!");
});
app.use("/", rootRouter);

// error handler middleware
app.use(errorHandler);

// server listening
app.listen(PORT, () => {
    console.log(`****Server started*****`);
    console.log(`URL: ${API_ENDPOINT}`);

    connectToDatabase();
});

export default app;