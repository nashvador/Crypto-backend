import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: String,
  passwordHash: String,
  portfolio: [
    {
      type: Schema.Types.ObjectId,
      ref: "Potfolio",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

type User = InferSchemaType<typeof userSchema>;

const User = model("User", userSchema);

module.exports = User;
