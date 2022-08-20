import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Fetching Portfolio");
});

router.post("/", (_req, res) => {
  res.send("Saving coin in Portfolio");
});

export default router;
