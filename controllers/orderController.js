import Order from "../models/orderModel.js";

export async function createOrder(req, res) {
  if (req.user == null) {
    return res.json({
      message: "You need to login first",
    });
  }

  const body = req.body;
  const orderData = {
    orderId: body.orderId,
    email: req.user.email,
    orderName: body.orderName,
    address: body.address,
    phoneNumber: body.phoneNumber,
    total: 0,
    orderItems: body.orderItems || [], // Assuming 'orderItems' is part of the request body
  };

  try {
    // Database processing
    const lastBills = await Order.find().sort({ date: -1 }).limit(1);

    if (lastBills.length === 0) {
      orderData.orderId = "ORD0001";
    } else {
      const lastBill = lastBills[0];
      const lastOrderId = lastBill.orderId;
      const lastOrderNumber = lastOrderId.replace("ORD", "");
      const lastOrderNumberInt = parseInt(lastOrderNumber);
      const newOrderNumber = lastOrderNumberInt + 1;
      orderData.orderId = "ORD" + String(newOrderNumber).padStart(4, "0");
    }

    // Save the order in the database
    const order = new Order(orderData);
    await order.save();

    return res.json({
      message: "Order saved successfully",
      data: order,
    });
  } catch (err) {
    return res.json({
      message: "Error saving order",
      error: err,
    });
  }
}

export async function getOrder(req, res) {
  try {
    // 1. පරිශීලකයා login කර ඇත්දැයි පරීක්ෂා කිරීම
    if (!req.user) {
      return res.json({ message: "Login required" });
    }

    // 2. Admin නම් සියලු ඇණවුම් ලබා ගන්න
    const user = req.user;
    if (user.role === "admin") {
      const allOrders = await Order.find();
      return res.json({ data: allOrders });
    }

    // 3. සාමාන්ය user නම් ඔවුන්ගේ email අනුව ඇණවුම් ලබා ගන්න
    const userOrders = await Order.find({ email: user.email });

    if (userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.json({ data: userOrders });
  } catch (err) {
    // 4. දෝෂයක් ඇති වූ විට
    // 5. දෝෂය console එකට ලියා තැබීම
    console.error("Error retrieving orders:", err);
    return res.status(500).json({
      message: "Error retrieving orders",
      error: err.message, // Specific error message පමණක් යවන්න
    });
  }
}

export async function deleteOrder(req, res) {
  try {
    // 1. පරිශීලකයා login කර ඇත්දැයි පරීක්ෂා කිරීම
    if (!req.user) {
      return res.status(401).json({ message: "Login required" });
    }

    // 2. Admin දැයි පරීක්ෂා කිරීම
    const user = req.user;
    if (user.role == "admin") {
      return res.status(403).json({ message: "Permission denied. User only." });
    }

    // 3. URL එකෙන් orderId ලබා ගැනීම (උදා: /api/orders/:orderId)
    const orderId = req.params.orderId;

    // 4. Order එක Database එකෙන් සෙවීම හා මකා දැමීම
    const deletedOrder = await Order.findOneAndDelete({ orderId: orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting order",
      error: err.message,
    });
  }
}
