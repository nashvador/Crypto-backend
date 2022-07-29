const cryptoRouter = require("express").Router();

cryptoRouter.get("/", async (request, response) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/ping`);
  console.log(res);
});

module.exports = cryptoRouter;
