// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
//connection with cluster
mongoose.connect("mongodb+srv://sameera:200102@cluster0.96uxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connection successful to mongodb cluster");
}).catch((err)=>{
    console.log(err);
})


//use bodyparser
app.use(bodyParser.json());

app.use("/api/students", studentRouter);

app.use("/api/items", itemRouter);

app.use("/api/users", userRouter);


//start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 
