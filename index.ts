import express from "express";
import portfolioRouter from "./routes/portfolio";
import userRouter from "./routes/userRoutes";
import loginRouter from "./routes/login";
import { PORT, MONGODB_URI } from "./utils/config";
const middleware = require("./utils/middleware");
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to Mongo");
  })
  .catch((error) => {
    console.log("error connecting to Mongo", error.message);
  });

app.use(middleware.requestLogger);

app.use("/api/portfolio", portfolioRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
