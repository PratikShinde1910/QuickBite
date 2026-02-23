import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import { Splash } from '../screens/Auth/Splash';
import { Login } from '../screens/Auth/Login';
import { Signup } from '../screens/Auth/Signup';
import { Home } from '../screens/Main/Home';
import { Orders } from '../screens/Main/Orders';
import { Profile } from '../screens/Main/Profile';
import { Favorites } from '../screens/Main/Favorites';
import { RestaurantDetails } from '../screens/Details/RestaurantDetails';
import { Cart } from '../screens/Details/Cart';
import { OrderSuccess } from '../screens/Details/OrderSuccess';
import { OrderTracking } from '../screens/Details/OrderTracking';
import { MenuItemDetails } from '../screens/Details/MenuItemDetails';
import { HelpCenter } from '../screens/Details/HelpCenter';
import { TermsOfService } from '../screens/Details/TermsOfService';

import { COLORS } from '../theme';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Will define missing components as Dummy for now so router compiles
const DummyScreen = () => null;

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Orders') iconName = focused ? 'receipt' : 'receipt-outline';
                    else if (route.name === 'Favorites') iconName = focused ? 'heart' : 'heart-outline';
                    else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: COLORS.surface,
                },
                tabBarItemStyle: {
                    paddingTop: 8,
                    paddingBottom: 4,
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export const RootNavigator = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    // Auth Flow
                    <>
                        <Stack.Screen name="Splash" component={Splash} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                    </>
                ) : (
                    // Main Flow
                    <>
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                        <Stack.Screen
                            name="RestaurantDetails"
                            component={RestaurantDetails}
                            options={{ presentation: 'fullScreenModal' }}
                        />
                        <Stack.Screen
                            name="Cart"
                            component={Cart}
                            options={{ presentation: 'modal' }}
                        />
                        <Stack.Screen
                            name="MenuItemDetails"
                            component={MenuItemDetails}
                            options={{ presentation: 'fullScreenModal' }}
                        />
                        <Stack.Screen
                            name="OrderSuccess"
                            component={OrderSuccess}
                            options={{ gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="OrderTracking"
                            component={OrderTracking}
                        />
                        <Stack.Screen
                            name="HelpCenter"
                            component={HelpCenter}
                        />
                        <Stack.Screen
                            name="TermsOfService"
                            component={TermsOfService}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
