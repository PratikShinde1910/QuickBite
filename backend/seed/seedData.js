const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Models
const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected!");

        // Clear existing collections
        console.log("Clearing existing data...");
        await Restaurant.deleteMany();
        await MenuItem.deleteMany();
        console.log("Collections cleared successfully.");

        // Define 10 realistic restaurants
        const restaurantsData = [
            {
                name: "Bella Italia",
                category: "Italian",
                rating: 4.8,
                pickupTime: 25,
                image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
                menuItems: [
                    { name: "Penne Arrabbiata", description: "Spicy tomato sauce with garlic and fresh basil.", price: 14.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80" },
                    { name: "Classic Lasagna", description: "Layers of pasta with meat sauce, ricotta, and mozzarella.", price: 16.50, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80" },
                    { name: "Tiramisu", description: "Coffee-flavored Italian dessert.", price: 7.99, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80" },
                    { name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs.", price: 5.50, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&q=80" },
                    { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and sweet basil.", price: 9.99, image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=500&q=80" }
                ]
            },
            {
                name: "Taj Mahal Spice",
                category: "Indian",
                rating: 4.7,
                pickupTime: 35,
                image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
                menuItems: [
                    { name: "Chicken Tikka Masala", description: "Roasted marinated chicken chunks in spiced curry sauce.", price: 15.99, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" },
                    { name: "Butter Naan", description: "Soft, pillowy oven-baked flatbread.", price: 3.50, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
                    { name: "Vegetable Biryani", description: "Aromatic basmati rice cooked with mixed vegetables.", price: 13.99, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
                    { name: "Samosas", description: "Crispy pastry filled with spiced potatoes and peas.", price: 6.99, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&q=80" },
                    { name: "Palak Paneer", description: "Paneer cubes in a thick paste made from puréed spinach.", price: 14.50, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" }
                ]
            },
            {
                name: "Golden Dragon",
                category: "Chinese",
                rating: 4.5,
                pickupTime: 20,
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
                menuItems: [
                    { name: "Kung Pao Chicken", description: "Spicy, stir-fried Chinese dish with chicken, peanuts, and vegetables.", price: 12.99, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&q=80" },
                    { name: "Sweet and Sour Pork", description: "Deep-fried pork with pineapple, bell peppers, and sweet and sour sauce.", price: 13.50, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80" },
                    { name: "Pork Dumplings", description: "Pan-fried pork and cabbage dumplings.", price: 8.50, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&q=80" },
                    { name: "Spring Rolls", description: "Crispy fried rolls filled with mixed vegetables.", price: 5.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
                    { name: "Egg Fried Rice", description: "Classic wok-tossed rice with egg and soy sauce.", price: 9.99, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80" }
                ]
            },
            {
                name: "Burger Joint",
                category: "Fast Food",
                rating: 4.2,
                pickupTime: 15,
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
                menuItems: [
                    { name: "Classic Cheeseburger", description: "Beef patty, cheddar, lettuce, tomato, and house sauce.", price: 9.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
                    { name: "Bacon Double Meat", description: "Two prime beef patties with crispy smokehouse bacon.", price: 13.99, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&q=80" },
                    { name: "Crispy Fries", description: "Golden shoestring fries sprinkled with sea salt.", price: 4.50, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },
                    { name: "Onion Rings", description: "Beer-battered onion rings with a side of ranch.", price: 5.50, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&q=80" },
                    { name: "Vanilla Milkshake", description: "Thick and creamy hand-spun vanilla shake.", price: 6.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80" }
                ]
            },
            {
                name: "The Cozy Cafe",
                category: "Cafe",
                rating: 4.9,
                pickupTime: 10,
                image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
                menuItems: [
                    { name: "Caramel Macchiato", description: "Freshly brewed espresso with steamed milk and caramel drizzle.", price: 4.99, image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&q=80" },
                    { name: "Avocado Toast", description: "Smashed avocado on sourdough with a sunny-side-up egg.", price: 11.50, image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500&q=80" },
                    { name: "Blueberry Muffin", description: "Freshly baked extra-large muffin loaded with blueberries.", price: 3.99, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80" },
                    { name: "Butter Croissant", description: "Flaky, buttery French pastry.", price: 3.50, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80" },
                    { name: "Iced Latte", description: "Chilled espresso and milk over ice.", price: 4.50, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" }
                ]
            },
            {
                name: "Sushi Master",
                category: "Japanese",
                rating: 4.8,
                pickupTime: 40,
                image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
                menuItems: [
                    { name: "Spicy Tuna Roll", description: "Fresh tuna with spicy mayo and cucumber.", price: 12.99, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80" },
                    { name: "California Roll", description: "Crabmeat, avocado, and cucumber inside out.", price: 9.99, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80" },
                    { name: "Salmon Nigiri", description: "Fresh salmon slice over pressed vinegared rice.", price: 8.99, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80" },
                    { name: "Miso Soup", description: "Traditional Japanese soup with tofu and scallions.", price: 3.99, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
                    { name: "Seaweed Salad", description: "Marinated wakame seaweed with sesame seeds.", price: 5.99, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80" }
                ]
            },
            {
                name: "El Mariachi",
                category: "Mexican",
                rating: 4.6,
                pickupTime: 25,
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
                menuItems: [
                    { name: "Street Tacos", description: "Three soft corn tortillas with carne asada, onions, and cilantro.", price: 11.99, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80" },
                    { name: "Chicken Quesadilla", description: "Flour tortilla loaded with melted cheese and grilled chicken.", price: 10.50, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },
                    { name: "Chips & Guacamole", description: "Freshly mashed avocados with warm tortilla chips.", price: 7.99, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80" },
                    { name: "Burrito Bowl", description: "Rice, black beans, fajita veggies, pico de gallo, and carnitas.", price: 12.99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
                    { name: "Churros", description: "Classic deep-fried dough coated in cinnamon sugar.", price: 6.50, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80" }
                ]
            },
            {
                name: "Healthy Bites",
                category: "Healthy",
                rating: 4.7,
                pickupTime: 15,
                image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
                menuItems: [
                    { name: "Quinoa Power Bowl", description: "Quinoa mixed with roasted veggies, chickpeas, and tahini.", price: 13.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
                    { name: "Grilled Salmon Salad", description: "Fresh mixed greens topped with perfectly grilled salmon.", price: 16.50, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80" },
                    { name: "Green Detox Smoothie", description: "Spinach, kale, apple, and ginger blended smoothly.", price: 7.50, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" },
                    { name: "Grilled Chicken Wrap", description: "Whole wheat wrap packed with grilled chicken and hummus.", price: 11.99, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80" },
                    { name: "Sweet Potato Fries", description: "Baked sweet potato wedges with a sprinkle of paprika.", price: 5.99, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" }
                ]
            },
            {
                name: "Texas BBQ",
                category: "Fast Food", // Could add BBQ category, but mapping to existing ones if needed
                rating: 4.4,
                pickupTime: 30,
                image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80",
                menuItems: [
                    { name: "Smoked Beef Brisket", description: "Slow-smoked over hickory wood for 14 hours.", price: 18.99, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&q=80" },
                    { name: "BBQ Rack of Ribs", description: "Fall-off-the-bone ribs slathered in BBQ sauce.", price: 21.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
                    { name: "Mac and Cheese", description: "Three-cheese baked macaroni.", price: 6.99, image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=500&q=80" },
                    { name: "Creamy Coleslaw", description: "Shredded cabbage and carrots in a tangy dressing.", price: 4.50, image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=500&q=80" },
                    { name: "Pulled Pork Sandwich", description: "Tender pulled pork piled high on a brioche bun.", price: 12.99, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&q=80" }
                ]
            },
            {
                name: "Sweet Treats",
                category: "Desserts",
                rating: 4.6,
                pickupTime: 10,
                image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
                menuItems: [
                    { name: "Molten Chocolate Cake", description: "Warm chocolate cake with a gooey fudge center.", price: 8.99, image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=500&q=80" },
                    { name: "New York Cheesecake", description: "Classic creamy cheesecake with a graham cracker crust.", price: 7.99, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80" },
                    { name: "Assorted Macarons", description: "A box of six colorful and flavorful French macarons.", price: 12.00, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&q=80" },
                    { name: "Fudge Sundae", description: "Vanilla bean ice cream loaded with hot fudge and nuts.", price: 6.50, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
                    { name: "Double Fudge Brownie", description: "Rich and chewy chocolate brownie.", price: 4.99, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" }
                ]
            }
        ];

        // Insert into database
        for (const data of restaurantsData) {
            const { menuItems, ...restaurantInfo } = data;

            // Use mongoose create
            const newRestaurant = await Restaurant.create(restaurantInfo);

            // Give each menuItem the restaurant's ObjectId
            const menuItemsWithRestId = menuItems.map(item => ({
                ...item,
                restaurant: newRestaurant._id
            }));

            // Insert menu items
            await MenuItem.insertMany(menuItemsWithRestId);
        }

        console.log("Database seeded successfully with 10 restaurants and menus");
        mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("Error with data import:", error);
        process.exit(1);
    }
};

seedDatabase();
