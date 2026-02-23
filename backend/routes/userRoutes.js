const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { toggleFavorite, getFavorites, updateProfile } = require("../controllers/userController");

router.get("/favorites", protect, getFavorites);
router.patch("/favorites/:restaurantId", protect, toggleFavorite);
router.put("/profile", protect, updateProfile);

module.exports = router;
