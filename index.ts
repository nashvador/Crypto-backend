import express from "express";
import portfolioRouter from "./routes/portfolio";
import userRoutes from "./routes/userRoutes";
import { PORT, MONGODB_URI } from "./utils/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/portfolio", portfolioRouter);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
