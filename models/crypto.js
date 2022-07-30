const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  portfolio: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
  storedCypto: Array,
});

cryptoSchema.set("toJSON", {
  transform: (document, schemaObject) => {
    schemaObject.id = schemaObject._id.toString();
    delete schemaObject._id;
    delete schemaObject.__v;
  },
});

const Portfolio = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
