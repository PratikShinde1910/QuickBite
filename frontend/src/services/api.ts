import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
});

// 🔥 THIS IS THE IMPORTANT PART
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;