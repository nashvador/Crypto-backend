import express from "express";
const User = require("../models/userModel");

const router = express.Router();

router.get("/", async (_request, response) => {
  const users = await User.find({});
  response.json(users);
});

export default router;
