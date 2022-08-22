import { Router, Request, Response, NextFunction } from "express";
const Portfolio = require("../models/portfolioModel");
import { GetUserAuthInfoRequest } from "../utils/middleware";

const router = Router();

router.get("/", async (_request: Request, response: Response) => {
  const getPortfolio = await Portfolio.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(getPortfolio);
});

router.post(
  "/",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const body = request.body;
    const user = request.user;
    const coin = new Portfolio({
      portfolio: body.coin,
      user: user._id,
    });

    const postCoin = await coin.save();
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

    const foundUser = request.user;
    const body = request.body;
    const newCoin = {
      portfolio: body.coin,
    };
    if (portfolio.user.toString() === foundUser._id.toString()) {
      await Portfolio.findByIdAndUpdate(request.params.id, { $pull: newCoin });
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "incorrect user" });
    }
  }
);

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
