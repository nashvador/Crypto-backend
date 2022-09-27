import express from "express";
import portfolioRouter from "./routes/portfolio";
import userRouter from "./routes/userRoutes";
import loginRouter from "./routes/login";
import apiRouter from "./routes/apiInfoRoutes";
import healthCheckRouter from "./routes/healthCheckRoutes";
import { MONGODB_URI } from "./utils/config";
const middleware = require("./utils/middleware");
const cors = require("cors");
import mongoose from "mongoose";
const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to Mongo");
  })
  .catch((error) => {
    console.log("error connecting to Mongo", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/coininfo", apiRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/healthCheck", healthCheckRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
