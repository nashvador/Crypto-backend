const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  passwordHash: String,
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
  },
});

userSchema.set("toJSON", {
  transform: (document, schemaObject) => {
    schemaObject.id = schemaObject._id.toString();
    delete schemaObject._id;
    delete schemaObject.__v;
    delete schemaObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
