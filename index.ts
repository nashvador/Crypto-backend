import express from "express";
import portfolioRouter from "./routes/portfolio";
import userRoutes from "./routes/userRoutes";
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
app.use("/api/users", userRoutes);

app.use(middleware.unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
