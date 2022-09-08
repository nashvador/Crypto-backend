const mongoose = require("mongoose");
const supertest = require("supertest");
import server from "../index";
import * as helper from "./test_helper";
const api = supertest(server);
const User = require("../models/userModel");
const Portfolio = require("../models/portfolioModel");

describe("Ability to get a new portfolio", () => {
  let headers: object;

  beforeEach(async () => {
    await User.deleteMany({});
    await Portfolio.deleteMany({});

    const newUser = {
      username: "nashv",
      name: "nash vador",
      password: "password",
    };

    await api.post("/api/users").send(newUser);

    const result = await api.post("/api/login").send(newUser);

    headers = {
      Authorization: `bearer ${result.body.token}`,
    };
  });

  test("can get portfolio information", async () => {
    const response = await api.get("/api/portfolio").set(headers);
    expect(response.type).toEqual("application/json");
  });

  test("A valid portfolio can be added", async () => {
    const newPortfolio = {
      coin: "bitcoin",
      date: new Date(2022, 9, 5),
      amount: 0.4,
    };
    await api.post("/api/portfolio").set(headers).send(newPortfolio);

    const portfolioAfterAdd = await helper.PortfoliosInDb();
    expect(portfolioAfterAdd).toHaveLength(1);

    const contents = portfolioAfterAdd.map((n: any) => n.coinId);
    expect(contents).toContain("bitcoin");
  });
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
