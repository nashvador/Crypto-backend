const Portfolio = require("../models/portfolioModel");
const User = require("../models/userModel");

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((userInfo: any) => userInfo.toJSON());
};

const PortfoliosInDb = async () => {
  const coins = await Portfolio.find({});
  return coins.map((coinInfo: any) => coinInfo.toJSON());
};

module.exports = {
  usersInDb,
  PortfoliosInDb,
};
