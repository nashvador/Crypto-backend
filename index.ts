import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  axios.get(`https://api.coingecko.com/api/v3/ping
  `).then(response => {
    const data: object = response.data.gecko_says
    console.log(data)
    res.send(data)
  }).catch(err => console.log(err))
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});