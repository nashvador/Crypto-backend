export {};
const mongoose = require("mongoose");
const supertest = require("supertest");
const { server } = require("../index");
import * as helper from "./test_helper";
const api = supertest(server);
const User = require("../models/userModel");
const Portfolio = require("../models/portfolioModel");

describe("Ability to get and add a new portfolio", () => {
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

  test("Add portfolio fails if a coin is missing", async () => {
    const invalidPortfolio = {
      coin: "",
      date: new Date(2022, 9, 5),
      amount: 0.4,
    };
    const newPortfolio = new Portfolio(invalidPortfolio);
    await expect(newPortfolio.validate()).rejects.toThrow();
  });

  test("Add portfolio fails if a date is missing or undefined", async () => {
    const invalidPortfolio = {
      coin: "bitcoin",
      date: undefined,
      amount: 0.4,
    };
    const newPortfolio = new Portfolio(invalidPortfolio);
    await expect(newPortfolio.validate()).rejects.toThrow();
  });

  test("Add portfolio fails if a amount is missing or undefined", async () => {
    const invalidPortfolio = {
      coin: "bitcoin",
      date: new Date(2022, 9, 5),
      amount: "",
    };
    const newPortfolio = new Portfolio(invalidPortfolio);
    await expect(newPortfolio.validate()).rejects.toThrow();
  });
});

describe("Ability to delete a portfolio", () => {
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

  test("Appropriate user can delete portfolio", async () => {
    const newPortfolio = {
      coin: "bitcoin",
      date: new Date(2022, 9, 5),
      amount: 0.4,
    };
    await api.post("/api/portfolio").set(headers).send(newPortfolio);

    const portfolioAfterAdd = await helper.PortfoliosInDb();

    const portfolioToDelete = portfolioAfterAdd.find(
      (coin: any) => coin.coinId === newPortfolio.coin
    );

    await api
      .delete(`/api/portfolio/${portfolioToDelete.id}`)
      .set(headers)
      .expect(204);

    const PortfoliosAtEnd = await helper.PortfoliosInDb();

    expect(PortfoliosAtEnd).toHaveLength(0);

    const contents = PortfoliosAtEnd.map((coin: any) => coin.coinId);

    expect(contents).not.toContain(portfolioToDelete.title);
  });
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
