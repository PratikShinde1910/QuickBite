import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, RestaurantCard, AppButton } from '../../components';
import { COLORS, SPACING } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

export const Favorites: React.FC<any> = ({ navigation }) => {
    const [favoriteRestaurants, setFavoriteRestaurants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users/favorites');
            // The backend getFavorites returns the fully populated array
            setFavoriteRestaurants(response.data);
        } catch (error) {
            console.error("Failed to fetch favorites inside screen", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <AppText variant="h1">Favorites</AppText>
            </View>

            {loading ? (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : favoriteRestaurants.length > 0 ? (
                <FlatList
                    data={favoriteRestaurants}
                    keyExtractor={item => item._id || item.id}
                    renderItem={({ item }) => (
                        <RestaurantCard
                            restaurant={item}
                            onPress={() => navigation.navigate('RestaurantDetails', { restaurantId: item._id || item.id })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={64} color={COLORS.border} />
                    <AppText variant="h2" style={styles.emptyTitle}>No Favorites Yet</AppText>
                    <AppText variant="body" color={COLORS.textLight} align="center">
                        You haven't saved any restaurants.{"\n"}Discover great food on the home tab!
                    </AppText>
                    <AppButton
                        title="Browse Restaurants"
                        style={styles.browseBtn}
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.m,
    },
    listContent: {
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'web' ? 120 : SPACING.xxxl,
        alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyTitle: {
        marginTop: SPACING.m,
        marginBottom: SPACING.s,
    },
    browseBtn: {
        marginTop: SPACING.xl,
    },
});
