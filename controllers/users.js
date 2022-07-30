const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const errorResponse = response.status(400);
  if (password === undefined) {
    return errorResponse.json({ error: "You must return a password." });
  } else if (password.length < 3) {
    return errorResponse.json({ error: "Your password is too short" });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return errorResponse.json({
      error: "Your username is not unique.",
    });
  }
  const saltRound = 9;
  const passwordHash = await bcrypt.hash(password, saltRound);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
