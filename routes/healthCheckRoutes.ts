import { Router, Response } from "express";

const router = Router();

router.get("/", async (_request, response: Response) => {
  response.send("ok");
});

export default router;
