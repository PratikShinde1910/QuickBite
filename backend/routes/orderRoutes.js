const express = require("express");
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    updateOrderStatus
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// All order routes are protected
router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/status").put(protect, updateOrderStatus);

module.exports = router;
