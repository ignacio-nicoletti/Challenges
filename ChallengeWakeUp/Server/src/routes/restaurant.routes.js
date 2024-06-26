import express from "express";
import {
  createRestaurant,
  DeleteRestaurantById,
  GetAllRestaurant,
  GetRestaurantbyId,
  UpdateRestaurantById,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/create", createRestaurant);

router.get("/", GetAllRestaurant);
router.get("/:id", GetRestaurantbyId);

router.put("/:id", UpdateRestaurantById);

router.delete("/:id", DeleteRestaurantById);

export default router;
