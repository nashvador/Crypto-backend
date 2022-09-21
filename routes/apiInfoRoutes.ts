import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

interface apiInterface extends Object {
  url: string;
}

router.post("/", async (request: Request, response: Response) => {
  const body: apiInterface = request.body;
  try {
    const responseAPI = await axios.get(body.url);
    response.json(responseAPI.data);
  } catch (err) {
    return err;
  }
});

export default router;
