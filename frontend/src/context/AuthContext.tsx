import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextType = {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: any) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<UserContextType>({
    user: null,
    token: null,
    isLoading: true,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            const storedUser = await AsyncStorage.getItem('userInfo');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error fetching auth token', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    const login = async (newToken: string, newUser: any) => {
        try {
            await AsyncStorage.setItem('userToken', newToken);
            await AsyncStorage.setItem('userInfo', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
        } catch (error) {
            console.error('Error saving user data', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userInfo');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Error clearing user data', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
