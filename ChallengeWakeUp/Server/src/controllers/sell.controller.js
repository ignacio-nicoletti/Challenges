import { formatError } from "../utils/formatError.js";
import { Sell } from "../models/sell.js";


export const createSell = async (req, res) => {
  const { selectedCommerce, products } = req.body;


  let currentDate = new Date();

  const timeZoneOffset = -3; // La diferencia de la zona horaria en horas
  currentDate.setHours(currentDate.getHours() + timeZoneOffset);

  const calculateTotal = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  try {
    let sell = new Sell({
      commerce: selectedCommerce,
      date: currentDate,
      products: products,
      totalPrice:calculateTotal()
    });
    await sell.save();
    return res.status(200).json({ msg: "sell create" });
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};

export const GetAllSell = async (req, res) => {
  try {
    let sell = await Sell.find();
    return res.status(200).json(sell.reverse());
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetSellbyId = async (req, res) => {
  const { id } = req.params;
  try {
    let sell = await Sell.findById(id);
    return res.status(200).json({ sell });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const UpdateSellById = async (req, res) => {
  const { id } = req.params;
  const { inputsData } = req.body;

  try {
    let sell = await Sell.findByIdAndUpdate(
      id,
      { $push: { products: inputsData } },
      { new: true }
    );
    return res.status(200).json({ sell });
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message)); // Asumo que tienes una función formatError para formatear el mensaje de error
  }
};

export const DeleteSellById = async (req, res) => {
  const { id } = req.params;
  try {
    await Sell.findByIdAndDelete(id);

    return res.status(200).json("producto eliminado");
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};
