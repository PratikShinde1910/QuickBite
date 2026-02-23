const express = require("express");
const router = express.Router();
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById
} = require("../controllers/restaurantController");

router.route("/").post(createRestaurant).get(getAllRestaurants);
router.route("/:id").get(getRestaurantById);

module.exports = router;
