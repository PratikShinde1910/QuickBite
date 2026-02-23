const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const mongoose = require("mongoose");

// @desc    Toggle a restaurant in user's favorites
// @route   PATCH /api/users/favorites/:restaurantId
// @access  Private
const toggleFavorite = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const userId = req.user._id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid Restaurant ID" });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const user = await User.findById(userId);

        // Check if restaurant is already in favorites
        const isFavorited = user.favorites.includes(restaurantId);

        let updatedUser;

        if (isFavorited) {
            // Remove from favorites
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { favorites: restaurantId } },
                { new: true }
            );
        } else {
            // Add to favorites
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { favorites: restaurantId } },
                { new: true }
            );
        }

        res.json(updatedUser.favorites);
    } catch (error) {
        console.error("Toggle Favorite error:", error);
        res.status(500).json({ message: "Server error toggling favorite" });
    }
};

// @desc    Get user's populated favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("favorites");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user.favorites);
    } catch (error) {
        console.error("Get Favorites error:", error);
        res.status(500).json({ message: "Server error fetching favorites" });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.gender = req.body.gender || user.gender;
            user.dob = req.body.dob || user.dob;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                gender: updatedUser.gender,
                dob: updatedUser.dob,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Update Profile error:", error);
        res.status(500).json({ message: "Server error updating profile" });
    }
};

module.exports = {
    toggleFavorite,
    getFavorites,
    updateProfile
};
