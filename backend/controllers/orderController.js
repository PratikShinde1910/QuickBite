const Order = require("../models/Order");


// Create Order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount
        });

        const createdOrder = await order.save();
        console.log("Order created by user:", req.user._id);
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
};


// Get Logged-in User Orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("items.menuItem");
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



module.exports = {
    createOrder,
    getMyOrders,
    updateOrderStatus
};
