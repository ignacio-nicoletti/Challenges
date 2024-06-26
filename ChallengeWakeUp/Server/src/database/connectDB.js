import mongoose from "mongoose";
import 'dotenv/config'

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("dataBase connect");
} catch (error) {
    console.log(error);
}