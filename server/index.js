const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

require("dotenv").config();

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
      console.log(err);
    });

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/checkout", stripeRoute);

  app.get("/", (req, res) => {
    res.status(200).send("Welcome to HomePage");
    console.log("Welcome to HomePage");
  });

  app.all("*", (req, res) => {
    res.status(404).send("Reaching a method route that doesn't exist.");
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `Server is listening on port: http://localhost:${process.env.PORT}`
    );
  });
};

startServer();
