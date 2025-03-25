//import express
import express from "express";

//import routes
import { deleteItem, getItems, goodItems, postItem, putItem, searchItems } from "../controllers/itemController.js";

const itemRouter = express.Router();    


itemRouter.get("/", getItems);
itemRouter.post("/", postItem);
itemRouter.get("/good", goodItems);
itemRouter.get("/:name",searchItems);

export default itemRouter;