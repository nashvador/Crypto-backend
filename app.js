const express = require("express");
const app = express();
const cors = require("cors");

const logger = require("./utils/logger");
const config = require("./utils/config");
const { requestLogger } = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const cryptoRouter = require("./controllers/coins");
const mongoose = require("mongoose");

logger.info("connecting with", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/crypto", cryptoRouter);

module.exports = app;
