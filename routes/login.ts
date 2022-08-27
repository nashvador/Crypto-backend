const jwt = require("jsonwebtoken");
import { Response, Request, Router } from "express";
const bcrypt = require("bcrypt");
const router = Router();
const User = require("../models/userModel");

router.post("/", async (request: Request, response: Response) => {
  const { username, password }: { username: string; password: string } =
    request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default router;
