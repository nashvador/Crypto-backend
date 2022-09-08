const Portfolio = require("../models/portfolioModel");
const User = require("../models/userModel");

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map((userInfo: any) => userInfo.toJSON());
};

export const PortfoliosInDb = async () => {
  const coins = await Portfolio.find({});
  return coins.map((coinInfo: any) => coinInfo.toJSON());
};
