import mongoose from "mongoose";

const sellSchema = new mongoose.Schema({
  id: { type: Number },
  commerce: { type: {} },
  date: {
    type: Date,
  },
  products: { type: Array, default: [] },
  totalPrice: { type: Number },
});

export const Sell = mongoose.model("Sell", sellSchema);
