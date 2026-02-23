const MenuItem = require("../models/MenuItem");

// Create Menu Item
const createMenuItem = async (req, res) => {
    try {
        const { restaurant, name, description, price, image } = req.body;

        if (!restaurant || !name || !price) {
            return res.status(400).json({ message: "Restaurant, name, and price are required" });
        }

        const menuItem = new MenuItem({
            restaurant,
            name,
            description,
            price,
            image
        });

        const createdMenuItem = await menuItem.save();
        res.status(201).json(createdMenuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Menu By Restaurant
const getMenuByRestaurant = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId });
        res.status(200).json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createMenuItem,
    getMenuByRestaurant
};
