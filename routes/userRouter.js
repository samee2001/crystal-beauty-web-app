import express from "express";
import {
  saveUser,
  searchDetailByName,
  userDetail,
  loginUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.get("/", userDetail);
userRouter.get("/:name", searchDetailByName);
userRouter.post("/login", loginUser);

export default userRouter;
