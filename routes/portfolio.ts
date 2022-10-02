import { Router, Request, Response, NextFunction } from "express";
const Portfolio = require("../models/portfolioModel");
import { GetUserAuthInfoRequest } from "../utils/middleware";
const User = require("../models/userModel");

const router = Router();

router.get("/", async (request: GetUserAuthInfoRequest, response: Response) => {
  const username = request.user.username;
  console.log(username);

  const getPortfolio = await User.find({ username }).populate("portfolio", {
    coinId: 1,
    date: 1,
    amountPurchased: 1,
  });
  response.json(getPortfolio);
});

router.post(
  "/",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const body = request.body;
    const user = request.user;

    const coin = new Portfolio({
      coinId: body.coin,
      date: body.date,
      amountPurchased: body.amount,
      user: user._id,
    });

    const postCoin = await coin.save();
    console.log(user.portfolio);
    user.portfolio = user.portfolio.concat(postCoin._id);
    await user.save();

    response.json(postCoin);
  }
);

router.delete(
  "/:id",
  async (
    request: GetUserAuthInfoRequest,
    response: Response,
    _next: NextFunction
  ) => {
    const portfolio = await Portfolio.findById(request.params.id);
    const username = request.user.username;

    const foundUser = request.user;

    if (portfolio.user.toString() === foundUser._id.toString()) {
      await Portfolio.findByIdAndDelete(request.params.id);
      await User.find({ username }).updateOne(
        {},
        { $pull: { portfolio: request.params.id } }
      );
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "Incorrect User" });
    }
  }
);

// patch request

router.put(
  "/:id",
  async (request: Request, response: Response, _next: NextFunction) => {
    const body = request.body;

    const newCoin = {
      portfolio: body.coin,
    };

    const updateBlog = await Portfolio.findByIdAndUpdate(
      request.params.id,
      { $push: newCoin },
      { upsert: true, new: true }
    );
    response.json(updateBlog);
  }
);

export default router;
