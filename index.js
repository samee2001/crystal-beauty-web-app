// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import { authJWT } from "./middlewares/auth.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();
//connection with cluster
mongoose
  .connect(
    "mongodb+srv://sameera:200102@cluster0.96uxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connection successful to mongodb cluster");
  })
  .catch((err) => {
    console.log(err);
  });

//use bodyparser
app.use(bodyParser.json());

//middleware for jwt authorization
app.use(authJWT);

//routes
app.use("/api/students", studentRouter);

app.use("/api/items", itemRouter);

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

//start server
app.listen(5000, () => {
  console.log("Server is running.. 5000");
});
