import express from "express";
import {
  createSell,
  DeleteSellById,
  GetAllSell,
  GetSellbyId,
  UpdateSellById,
} from "../controllers/sell.controller.js";

const router = express.Router();

router.post("/create", createSell);

router.get("/", GetAllSell);
router.get("/:id", GetSellbyId);

router.put("/:id", UpdateSellById);

router.delete("/:id", DeleteSellById);

export default router;
