import mongoose from "mongoose";

// Create schema for Item
const itemSchema = new mongoose.Schema({
  name: String,
  value: Number,
  description: String,
});

// Create model to connect with the database
const ItemModel = mongoose.model("items", itemSchema);

export default ItemModel;
