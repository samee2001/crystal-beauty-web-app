import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    altNames: {
        type: [String], //array of strings
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labelPrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type:[String], //array of strings
        default: []
    }
});

const Product = mongoose.model("product", productSchema);

export default Product;