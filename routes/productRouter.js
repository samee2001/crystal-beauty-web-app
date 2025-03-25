import express from "express";

import { createProduct, getProducts, searchItem } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:name", searchItem);

export default productRouter;