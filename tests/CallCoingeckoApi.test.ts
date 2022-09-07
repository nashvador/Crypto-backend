const mongoose = require("mongoose");
const supertest = require("supertest");
import server from "../index";
const api = supertest(server);

test("server can be pinged from Backend", async () => {
  const apiURL: object = { url: "https://api.coingecko.com/api/v3/ping" };
  const response = await api.post("/api/coininfo").send(apiURL);
  expect(response.type).toEqual("application/json");
  expect(response.body.gecko_says).toEqual("(V3) To the Moon!");
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
