const mongoose = require("mongoose");
const supertest = require("supertest");
import server from "../index";
const api = supertest(server);
const User = require("../models/userModel");

describe("Addition of a new portfolio", () => {
  let headers: object;

  beforeEach(async () => {
    await User.deleteMany({});

    const newUser = {
      username: "nashv",
      name: "nash vador",
      password: "password",
    };
    const newPortfolio = {
      coin: "bitcoin",
      date: new Date(2022, 9, 5),
      amount: 0.4,
    };

    await api.post("/api/users").send(newUser);

    const result = await api.post("/api/login").send(newUser);

    headers = {
      Authorization: `bearer ${result.body.token}`,
    };

    await api.post("/api/portfolio").set(headers).send(newPortfolio);
  });

  test("can get portfolio information", async () => {
    const newPortfolio = {
      coin: "bitcoins",
      date: new Date(2022, 9, 5),
      amount: 0.4,
    };

    const response = await api
      .post("/api/portfolio")
      .send(newPortfolio)
      .set(headers);
    console.log(response.body);
    expect(response.type).toEqual("application/json");
  });

  //   test("A valid portfolio can be added ", async () => {
  //     const newPortfolio = {
  //       coinId: "bitcoin",
  //       date: new Date(2022, 9, 5),
  //       amountPurchased: 0.4,
  //     };

  //     await api
  //       .post("/api/portfolio")
  //       .send(newPortfolio)
  //       .set(headers)

  //       .expect(201)
  //       .expect("Content-Type", /application\/json/);

  //     const portfolioItems = await helper.PortfoliosInDb();
  //     expect(portfolioItems).toHaveLength(1);

  //     const contents = portfolioItems.map((coin: any) => coin.coinId);
  //     expect(contents).toContain("bitcoin");
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
