const Restaurant = require("../models/Restaurant");

// Create Restaurant
const createRestaurant = async (req, res) => {
    try {
        const { name, category, image, pickupTime } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const restaurant = new Restaurant({
            name,
            category,
            image,
            pickupTime
        });

        const createdRestaurant = await restaurant.save();
        console.log("Restaurant created:", createdRestaurant.name);
        res.status(201).json(createdRestaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Restaurants (with optional search filter)
const getAllRestaurants = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } }
                ]
            };
        }

        const restaurants = await Restaurant.find(query);
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Search/Get All Error:", error);
        res.status(500).json({ message: "Server Error fetching restaurants" });
    }
};

// Get Restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById
};
