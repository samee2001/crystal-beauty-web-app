// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";

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
const authHeader = req.header("Authorization");

    if (authHeader != null) {
        const token = authHeader.replace("Bearer ", "");
        console.log("Token received:", token);

        jwt.verify(token, "random123", (err, decoded) => {
            if (err) {
                console.log("Error verifying token:", err.message);
                res.json({ message: err.message });

            } else if (decoded != null) {
                console.log(token);
                req.user = decoded;
                console.log("Decoded token:", decoded); // Display decoded values
                res.json({ message: "Token is valid" });
            }
                
        });
    } else {
        console.log("No Authorization header found");
    }
    
    next(); // Continue processing the request regardless of whether the token was valid or not
});


app.use("/api/students", studentRouter);

app.use("/api/items", itemRouter);

app.use("/api/users", userRouter);


//start server
app.listen(3000, () => {
    console.log("Server is running.. 3000");
}); 
