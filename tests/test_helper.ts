const Portfolio = require("../models/portfolioModel");
const User = require("../models/userModel");

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((userInfo: any) => userInfo.toJSON());
};

module.exports = {
  usersInDb,
};
