const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  crypto: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crypto",
    },
  ],
});

portfolioSchema.set("toJSON", {
  transform: (document, schemaObject) => {
    schemaObject.id = schemaObject._id.toString();
    delete schemaObject._id;
    delete schemaObject.__v;
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
