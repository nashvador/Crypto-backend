import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port: Number = parseInt(process.env.PORT || "3001");

app.get("/", (req: Request, res: Response) => {
  const sendGetRequest = async (): Promise<object> => {
    const apiResp = await axios.get(`https://api.coingecko.com/api/v3/ping`);
    const data: object = apiResp.data.gecko_says;
    console.log(data);
    res.send(data);
    return data;
  };
  sendGetRequest();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
