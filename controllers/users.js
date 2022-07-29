const usersRouter = require("express").Router();

usersRouter.get("/", async (request, response) => {
  response.send("hello");
});

module.exports = usersRouter;
