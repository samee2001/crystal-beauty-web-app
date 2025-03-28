//import express
import express from "express";

//import routes
import {
  deleteStudent,
  getStudents,
  postStudent,
  putStudent,
} from "../controllers/studentController.js";

const studentRouter = express.Router();
const ItemRouter = express.Router();

studentRouter.get("/", getStudents);

studentRouter.post("/", postStudent);

studentRouter.put("/", putStudent);

studentRouter.delete("/", deleteStudent);

export default studentRouter;
