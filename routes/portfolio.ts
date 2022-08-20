import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Fetching Portfolio");
});

router.post("/", (_req, res) => {
  res.send("Saving coin in Portfolio");
});

export default router;
