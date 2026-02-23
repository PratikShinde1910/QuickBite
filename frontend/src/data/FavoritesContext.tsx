import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';


interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadFavorites();
        } else {
            setFavorites([]);
        }
    }, [user]);

    const loadFavorites = async () => {
        try {
            const response = await api.get('/users/favorites');
            // Backend returns an array. It could be populated restaurants or ObjectIds.
            // Since we use this state just for ID checking, we ensure we map to IDs.
            const favIds = response.data.map((fav: any) => typeof fav === 'string' ? fav : fav._id);
            setFavorites(favIds);
        } catch (error) {
            console.error('Error loading favorites from backend:', error);
        }
    };

    const toggleFavorite = async (id: string) => {
        if (!user) return; // Must be logged in

        // Optimistic UI update
        const isFav = favorites.includes(id);
        const optimisticFavorites = isFav
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];
        setFavorites(optimisticFavorites);

        try {
            const response = await api.patch(`/users/favorites/${id}`);
            // Ensure sync with server state
            const serverFavIds = response.data.map((fav: any) => typeof fav === 'string' ? fav : fav._id);
            setFavorites(serverFavIds);
        } catch (error) {
            console.error('Error toggling favorite on backend:', error);
            // Revert on error
            loadFavorites();
        }
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
