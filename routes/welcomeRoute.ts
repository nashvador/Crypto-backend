import { Router, Response } from "express";

const router = Router();

router.get("/", async (_request, response: Response) => {
  response.send(
    "Welcome to the backend of CoinNow - I'm glad to have you here!"
  );
});

export default router;
