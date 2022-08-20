import express, { Response, Request } from "express";
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  const {
    username,
    name,
    password,
  }: { username: string; name: string; password: string } = request.body;
  if (password === undefined) {
    return response.status(400).json({ error: "You must return a password" });
  } else if (password.length < 3) {
    return response.status(400).json({ error: "Password is too short" });
  }

  const existingUser: boolean = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

router.get("/", async (_request, response) => {
  const users = await User.find({});
  response.json(users);
});

export default router;
