import { Schema, model } from "mongoose";

interface IPortfolio {
  portfolio: Array<any>;
  user: object;
}

const portfolioSchema = new Schema<IPortfolio>({
  portfolio: [],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

portfolioSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Portfolio = model<IPortfolio>("Portfolio", portfolioSchema);

module.exports = Portfolio;
