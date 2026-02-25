# 🍔 QuickBite – Campus Food Pickup App

QuickBite is a full-stack food ordering mobile application built using React Native (Expo) and Node.js.  
The app allows users to browse restaurants, add favorites, place pickup orders, and manage authentication securely using JWT.

This is a professionally developed mobile application. For deployment and live demonstration purposes, it has also been adapted to a web version using Expo Web, which can be accessed through the provided link. Mobile application screenshots are shared below for showcase and reference. 🚀

---
<table>
   <tr>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/assets/screenshots/homeScreen.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/restaurantPage.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/food.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/orderConfirm.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/cart.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/favorites.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/orders.png" width=250/></td>
<td><img src="https://raw.githubusercontent.com/PratikShinde1910/QuickBite/main/profile.png" width=250/></td>
</tr>
</table>
## 🚀 Live Demo

🌐 Frontend (Web): https://quickbite-ngl.netlify.app


---

## 📱 Features

### 🔐 Authentication
- User Signup
- User Login
- JWT-based authentication
- Secure token storage using AsyncStorage
- Protected backend routes

### 🍽 Restaurants
- Fetch restaurant list from backend
- View restaurant details
- Category filtering
- Dynamic data from MongoDB

### ❤️ Favorites
- Add / Remove favorites
- Persist favorites per user
- Protected route with JWT validation

### 🛒 Cart & Orders
- Add items to cart
- Dynamic cart calculation
- Checkout API integration
- Order placement with authentication

---

## 🛠 Tech Stack

### 📱 Frontend
- React Native (Expo)
- TypeScript
- Axios
- React Navigation
- AsyncStorage
- Context API

### 🖥 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- CORS

### ☁ Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---


## ⚙ Environment Variables

### Backend (.env)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5050


### Frontend (.env)

EXPO_PUBLIC_API_URL=https://your-render-url.onrender.com/api


---

## 🧠 API Architecture

All protected routes require:


Authorization: Bearer <token>


JWT token is automatically attached using Axios interceptor.

---

## 🔄 How It Works

1. User registers → Backend hashes password
2. JWT token is generated
3. Token stored in AsyncStorage
4. Axios attaches token to all protected API calls
5. Backend middleware validates token
6. User-specific data (favorites, orders) returned

---

## 🧪 Running Locally

### Backend

cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npx expo start

For web:

npx expo export -p web


## 📈 Future Improvements

Payment gateway integration

Admin dashboard

Push notifications

Order tracking with live status

Rating & reviews system

## 👨‍💻 Developer

Pratik Rajendra Shinde
Full Stack Mobile Developer
React Native | Node.js | MongoDB

## 📄 License

This project is for educational and portfolio purposes.


---

# 🔥 Important – After Pasting

1. Replace:
   - `your-netlify-url`
   
   - Your actual name if needed

2. Commit it:

```bash
git add README.md
git commit -m "Added professional README"
git push
