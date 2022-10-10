const mongoose = require("mongoose");
const supertest = require("supertest");
import server from "../index";
const api = supertest(server);

test("server displays a welcome message to user", async () => {
  const response = await api.get("/");
  expect(response.text).toContain(
    "Welcome to the backend of CoinNow - I'm glad to have you here!"
  );
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
