import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  adress: {
    type: String,
  },
  products: { type: Array, default: [] },
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
