const http = require('http');

async function runTests() {
    const baseUrl = 'http://localhost:5055/api';

    console.log("--- Testing Auth ---");

    // Register a user
    const registerRes = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test User', email: `test${Date.now()}@example.com`, password: 'password123' })
    });
    const authData = await registerRes.json();
    console.log("Register Auth status:", registerRes.status);
    const token = authData.token;

    console.log("\n--- Testing Restaurants ---");
    // Create restaurant
    const restRes = await fetch(`${baseUrl}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Pizza Place', category: 'Italian' })
    });
    const restData = await restRes.json();
    console.log("Create Restaurant status:", restRes.status);
    const restaurantId = restData._id;

    // Get all restaurants
    const allRestRes = await fetch(`${baseUrl}/restaurants`);
    const allRestData = await allRestRes.json();
    console.log("Get All Restaurants count:", allRestData.length);

    console.log("\n--- Testing Menu Item ---");
    // Create menu item
    const menuRes = await fetch(`${baseUrl}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant: restaurantId, name: 'Margherita', price: 12.99 })
    });
    const menuData = await menuRes.json();
    console.log("Create Menu Item status:", menuRes.status);
    const menuItemId = menuData._id;

    console.log("\n--- Testing Order ---");
    // Create order
    const orderRes = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            items: [{ menuItem: menuItemId, quantity: 2 }],
            totalAmount: 25.98
        })
    });
    const orderData = await orderRes.json();
    console.log("Create Order status:", orderRes.status);

    // Get my orders
    const myOrdersRes = await fetch(`${baseUrl}/orders/myorders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const myOrdersData = await myOrdersRes.json();
    console.log("Get My Orders count:", myOrdersData.length);

    console.log("Tests Completed!");
}

runTests().catch(console.error);
