
import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems:{
        type: [
            {
                productId: String,
                name: String,
                quantity: Number,
                price: Number,
                Image: String,
                
            }
        ],
        required: true,
    },
  });


const Order = mongoose.model("Order", orderSchema);
export default Order;