const express = require("express");
const router = express.Router();
const {
    createMenuItem,
    getMenuByRestaurant
} = require("../controllers/menuController");

// The prompt specifies /api/menu and /api/menu/:restaurantId
router.route("/").post(createMenuItem);
router.route("/:restaurantId").get(getMenuByRestaurant);

module.exports = router;
