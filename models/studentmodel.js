import mongoose from "mongoose";

//create schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
});

//create model to connect with database. it acts as the intermediate between databse and scehma
const StudentModel = mongoose.model("student", studentSchema);

export default StudentModel;