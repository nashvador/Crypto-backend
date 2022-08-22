import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

interface apiInterface extends Object {
  url: string;
}

router.get("/", async (request: Request, response: Response) => {
  const body: apiInterface = request.body;
  const responseAPI = await axios.get(body.url);
  response.json(responseAPI.data);
});

export default router;
