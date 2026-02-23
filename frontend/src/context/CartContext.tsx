import React, { createContext, useState, ReactNode } from 'react';

export interface CartItem {
    _id: string; // React unique ID
    menuItemId: string; // Real MongoDB _id for API
    name: string;
    price: number;
    quantity: number;
    variation?: string;
    image?: string;
}

interface CartContextData {
    items: CartItem[];
    addToCart: (menuItem: any) => void;
    updateQuantity: (_id: string, delta: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (menuItem: any) => {
        setItems(prevItems => {
            const rawId = menuItem.menuItemId || menuItem._id || menuItem.id;
            const variation = menuItem.selectedVariation || null;
            const uiId = variation ? `${rawId}-${variation}` : rawId;

            const existingItem = prevItems.find(i => i._id === uiId);
            if (existingItem) {
                return prevItems.map(i => i._id === uiId
                    ? { ...i, quantity: i.quantity + (menuItem.quantity || 1) }
                    : i
                );
            }
            return [...prevItems, {
                _id: uiId,
                menuItemId: rawId,
                name: menuItem.name + (variation ? ` (${variation})` : ''),
                price: menuItem.calculatedPrice || menuItem.price,
                quantity: menuItem.quantity || 1,
                variation: variation,
                image: menuItem.image
            }];
        });
    };

    const updateQuantity = (_id: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item._id === _id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
