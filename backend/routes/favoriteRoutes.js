const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const { protect } = require("../middleware/authMiddleware");

// Get all favorites for logged in user
router.get("/", protect, async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id })
        .populate("restaurant");
    res.json(favorites);
});

// Add favorite
router.post("/:restaurantId", protect, async (req, res) => {
    const favorite = await Favorite.create({
        user: req.user._id,
        restaurant: req.params.restaurantId
    });

    res.status(201).json(favorite);
});

module.exports = router;