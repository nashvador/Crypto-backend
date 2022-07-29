const cryptoRouter = require("express").Router();
const axios = require("axios");

cryptoRouter.get("/", async (request, response) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/ping`);
  response.send(res.data);
});

module.exports = cryptoRouter;
