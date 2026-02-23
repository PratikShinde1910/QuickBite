import axios from "axios";

const API_URL = "https://quickbite-doq6.onrender.com"; // <-- your render backend URL

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export default api;