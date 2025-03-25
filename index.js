// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt, { decode } from "jsonwebtoken";
import e from "express";

const app = express();
//connection with cluster
mongoose.connect("mongodb+srv://sameera:200102@cluster0.96uxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connection successful to mongodb cluster");
}).catch((err)=>{
    console.log(err);
})


//use bodyparser
app.use(bodyParser.json());

//middleware for jwt decode

app.use((req, res, next) => {
    const header = req.header("Authorization");
    //console.log(header); //print token
    if(header != null){
        const token = header.replace("Bearer ", "");
        //console.log("original token:" + token);
        jwt.verify(token ,"random123", (err, decoded)=>{
            if (decoded!=null) {
                req.user = decoded;
            }
            else{
                res.json({
                    message: "token not verified",
                    error: err
                });
            }
        });
    }
 next();
});


app.use("/api/students", studentRouter);

app.use("/api/items", itemRouter);

app.use("/api/users", userRouter);


//start server
app.listen(5000, () => {
    console.log("Server is running.. 5000");
}); 
