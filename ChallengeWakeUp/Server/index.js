import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import "./src/database/connectDB.js";
import RoutesRestaurant from "./src/routes/restaurant.routes.js"
import RoutesSell from "./src/routes/sell.routes.js"
const app = express();

const port = process.env.PORT || 3001;

const whiteList = [process.env.DEPLOY_CLIENT_URL, "http://localhost:3001"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log("😲😲😲 =>", origin);
//       if (!origin || whiteList.includes(origin)) {
//         return callback(null, origin);
//       }
//       return callback("Error de CORS origin: " + origin + " No autorizado!");
//     },
//     credentials: true,
//   })
// );

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/restaurant",RoutesRestaurant)
app.use("/sell",RoutesSell)


app.listen(port, () => {
  console.log("server listen on port", port);
});
