import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  name: string;
  passwordHash: string;
  portfolio: Array<any>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  name: String,
  passwordHash: String,
  portfolio: [
    {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
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

const User = model<IUser>("User", userSchema);

module.exports = User;
