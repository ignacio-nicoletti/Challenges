import { formatError } from "../utils/formatError.js";
import { Restaurant } from "../models/restaurant.js";

export const createRestaurant = async (req, res) => {
  const { title, adress } = req.body.inputsData;
  try {
    let restaurant = new Restaurant({
      title,
      adress,
    });
    await restaurant.save();
    return res.status(200).json({ msg: "restaurant creado" });
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};

export const GetAllRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.find();
    return res.status(200).json(restaurant.reverse());
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetRestaurantbyId = async (req, res) => {
  const { id } = req.params;
  try {
    let restaurant = await Restaurant.findById(id);
    return res.status(200).json({ restaurant });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const UpdateRestaurantById = async (req, res) => {
  const { id } = req.params;
  const { inputsData, dataDelete } = req.body;

  try {
    let updateObj = { $push: { products: inputsData } };
    if (dataDelete !== undefined) {
      updateObj.$pull = { products: { title: dataDelete.title } };
    }
    let restaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateObj,
      { new: true }
    );
    return res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message)); // Asumo que tienes una función formatError para formatear el mensaje de error
  }
};



export const DeleteRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    await Restaurant.findByIdAndDelete(id);

    return res.status(200).json("producto eliminado");
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};
