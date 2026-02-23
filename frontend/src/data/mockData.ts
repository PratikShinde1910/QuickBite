export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface MenuItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
}

export interface RestaurantMenuCategory {
    category: string;
    items: MenuItem[];
}

export interface Restaurant {
    id: string; // Keep for legacy mock usage
    _id?: string; // MongoDB real ID
    name: string;
    rating: number;
    pickupTime: string;
    description: string;
    image: string;
    categories: string[];
    category?: string;
    reviews?: Review[];
    menu: RestaurantMenuCategory[];
}

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Pizza', icon: '🍕' },
    { id: '2', name: 'Burgers', icon: '🍔' },
    { id: '3', name: 'Cafe', icon: '☕' },
    { id: '4', name: 'Healthy', icon: '🥗' },
    { id: '5', name: 'Desserts', icon: '🍩' },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
    {
        id: 'r1',
        name: 'Slice of Heaven',
        rating: 4.8,
        pickupTime: '15-20 min',
        description: 'Authentic wood-fired campus pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
        categories: ['Pizza', 'Fast Food'],
        reviews: [
            { id: 'rev1', user: 'Alex M.', rating: 5, comment: 'Best pizza on campus! The crust is perfect.' },
            { id: 'rev2', user: 'Sam K.', rating: 4, comment: 'Really good, but delivery took a bit long today.' }
        ],
        menu: [
            {
                category: 'Wood-Fired Pizzas',
                items: [
                    { _id: 'm1', name: 'Margherita', price: 8.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80', description: 'Classic tomato and fresh mozzarella' },
                    { _id: 'm2', name: 'Pepperoni Feast', price: 10.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80', description: 'Double pepperoni with extra cheese' },
                ]
            }
        ]
    },
    {
        id: 'r2',
        name: 'Campus Grill',
        rating: 4.5,
        pickupTime: '10-15 min',
        description: 'Juicy burgers and crinkle fries',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
        categories: ['Burgers', 'Fast Food'],
        reviews: [
            { id: 'rev3', user: 'Jordan P.', rating: 5, comment: 'That spicy chicken burger is fire!' },
            { id: 'rev4', user: 'Taylor R.', rating: 4, comment: 'Solid burger, fries could be crispier.' }
        ],
        menu: [
            {
                category: 'Signature Burgers',
                items: [
                    { _id: 'm3', name: 'Classic Cheeseburger', price: 6.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', description: 'Beef patty, cheddar, lettuce, tomato' },
                    { _id: 'm4', name: 'Spicy Chicken', price: 7.49, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80', description: 'Crispy chicken breast with spicy mayo' },
                ]
            }
        ]
    },
    {
        id: 'r3',
        name: 'Green Bowl',
        rating: 4.9,
        pickupTime: '5-10 min',
        description: 'Fresh salads and grain bowls',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        categories: ['Healthy', 'Vegan'],
        reviews: [
            { id: 'rev5', user: 'Casey W.', rating: 5, comment: 'Love the fresh ingredients. The quinoa bowl is my go-to!' }
        ],
        menu: [
            {
                category: 'Bowls',
                items: [
                    { _id: 'm5', name: 'Quinoa Power Bowl', price: 9.50, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80', description: 'Quinoa, roasted veggies, tahini dressing' },
                    { _id: 'm6', name: 'Caesar Salad', price: 7.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80', description: 'Crisp romaine, parmesan, croutons' },
                ]
            }
        ]
    }
];

export const FEATURED_RESTAURANT = MOCK_RESTAURANTS[0];
