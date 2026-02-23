import React, { useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ViewStyle, Animated, Platform, useWindowDimensions } from 'react-native';
import { AppText } from './AppText';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme';
import { Restaurant } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../data/FavoritesContext';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onPress?: () => void;
    style?: ViewStyle;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
    restaurant,
    onPress,
    style,
}) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const restaurantId = restaurant._id || restaurant.id;
    const isFav = isFavorite(restaurantId);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { width: windowWidth } = useWindowDimensions();
    const isWeb = Platform.OS === 'web';

    // Calculate precise width based on breakpoints to enforce exact visual grid
    const getCardWidth = () => {
        if (!isWeb) return '100%';
        if (windowWidth > 1200) return '31.5%'; // Account for gaps in 3 columns
        if (windowWidth > 768) return '48%';    // Account for gaps in 2 columns
        return '100%';
    };

    const handleFavoritePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        toggleFavorite(restaurantId);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.container, style, { width: getCardWidth() }]}
            onPress={onPress}
        >
            <View>
                <Image source={{ uri: restaurant.image }} style={styles.image} />
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={handleFavoritePress}
                    activeOpacity={0.7}
                >
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Ionicons
                            name={isFav ? "heart" : "heart-outline"}
                            size={24}
                            color={isFav ? COLORS.error : COLORS.surface}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.headerRow}>
                    <AppText variant="h3" numberOfLines={1} style={styles.name}>
                        {restaurant.name}
                    </AppText>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFB800" />
                        <AppText variant="small" style={styles.ratingText}>
                            {restaurant.rating}
                        </AppText>
                    </View>
                </View>
                <AppText variant="caption" numberOfLines={1} style={styles.description}>
                    {restaurant.description}
                </AppText>
                <View style={styles.metaRow}>
                    <View style={styles.metaBadge}>
                        <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
                        <AppText variant="small" style={styles.metaText}>
                            {restaurant.pickupTime || 'N/A'}
                        </AppText>
                    </View>
                    <View style={styles.metaBadge}>
                        <Ionicons name="pricetag-outline" size={14} color={COLORS.textLight} />
                        <AppText variant="small" style={styles.metaText}>
                            {restaurant.categories ? restaurant.categories.join(', ') : restaurant.category}
                        </AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.m,
        overflow: 'hidden', // to ensure image honors radius
        ...SHADOWS.medium,
        marginBottom: SPACING.l,
        ...(Platform.OS === 'web' && {
            cursor: 'pointer',
            transitionDuration: '200ms',
        }),
    },
    image: {
        height: Platform.OS === 'web' ? 220 : 180,
        width: '100%',
        backgroundColor: COLORS.border,
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: SPACING.m,
        right: SPACING.m,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        padding: SPACING.m,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    name: {
        flex: 1,
        marginRight: SPACING.s,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: RADIUS.s,
    },
    ratingText: {
        marginLeft: 4,
        color: '#F57F17',
        fontWeight: 'bold',
    },
    description: {
        marginBottom: SPACING.m,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    metaText: {
        marginLeft: 4,
    },
});
