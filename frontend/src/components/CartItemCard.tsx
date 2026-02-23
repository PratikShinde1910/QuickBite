import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated, LayoutAnimation } from 'react-native';
import { AppText } from './AppText';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../context/CartContext';

interface CartItemCardProps {
    item: CartItem;
    onUpdateQuantity: (id: string, delta: number) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = React.memo(({ item, onUpdateQuantity }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleQuantityChange = (delta: number) => {
        // Optional scale animation on press
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();

        if (item.quantity + delta === 0) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }

        onUpdateQuantity(item._id, delta);
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Ionicons name="fast-food-outline" size={24} color={COLORS.textLight} />
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <AppText variant="title" style={styles.name} numberOfLines={1}>{item.name}</AppText>
                {item.variation && (
                    <AppText variant="small" color={COLORS.textLight} style={styles.variation}>
                        {item.variation}
                    </AppText>
                )}
                <AppText variant="body" color={COLORS.textLight} style={styles.price}>
                    ${item.price.toFixed(2)}
                </AppText>
            </View>

            <View style={styles.stepperContainer}>
                <TouchableOpacity
                    style={[styles.stepBtn, styles.minusBtn]}
                    onPress={() => handleQuantityChange(-1)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="remove" size={16} color={COLORS.text} />
                </TouchableOpacity>

                <AppText variant="title" style={styles.qtyText}>{item.quantity}</AppText>

                <TouchableOpacity
                    style={[styles.stepBtn, styles.plusBtn]}
                    onPress={() => handleQuantityChange(1)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="add" size={16} color={COLORS.surface} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.soft,
    },
    imageContainer: {
        marginRight: SPACING.m,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: COLORS.border,
    },
    placeholderImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    variation: {
        marginBottom: 4,
    },
    price: {
        marginTop: 2,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    minusBtn: {
        backgroundColor: COLORS.background,
    },
    plusBtn: {
        backgroundColor: COLORS.primary,
        ...SHADOWS.soft,
    },
    qtyText: {
        width: 32,
        textAlign: 'center',
    },
});
