import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { AppText } from './AppText';
import { COLORS, SHADOWS, SPACING } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export const MiniCartBar: React.FC = React.memo(() => {
    const { items, cartCount } = React.useContext(CartContext);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const route = useRoute();

    // Check if we are inside a tab screen. 
    // Tab navigators naturally stop the screen content above the tab bar.
    // We only need 16px of spacing if the tab bar is present.
    // If the tab bar is absent (e.g. on RestaurantDetails), we MUST add insets.bottom!
    const isTabScreen = ['Home', 'Orders', 'Favorites', 'Profile'].includes(route.name);
    const bottomSpacing = isTabScreen ? 16 : Math.max(insets.bottom, 16) + 10;

    const [isVisible, setIsVisible] = React.useState(cartCount > 0);
    const slideAnim = useRef(new Animated.Value(cartCount > 0 ? 0 : 100)).current;
    const fadeAnim = useRef(new Animated.Value(cartCount > 0 ? 1 : 0)).current;

    useEffect(() => {
        if (cartCount > 0) {
            setIsVisible(true);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start(() => {
                setIsVisible(false);
            });
        }
    }, [cartCount, slideAnim, fadeAnim]);

    const thumbnails = useMemo(() => {
        // Collect unique images from cart items
        const urls = items.map(item => item.image).filter(Boolean);
        const unique = Array.from(new Set(urls));
        return {
            images: unique.slice(0, 2),
            extraCount: unique.length > 2 ? unique.length - 2 : 0,
        };
    }, [items]);

    if (!isVisible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    bottom: bottomSpacing,
                    transform: [{ translateY: slideAnim }],
                    opacity: fadeAnim
                }
            ]}
        >
            <TouchableOpacity
                style={styles.content}
                activeOpacity={0.9}
                onPress={() => cartCount > 0 && navigation.navigate('Cart')}
            >
                <View style={styles.leftSection}>
                    {thumbnails.images.map((img, index) => (
                        <Image
                            key={`thumb-${index}`}
                            source={{ uri: img as string }}
                            style={[
                                styles.thumbnail,
                                index > 0 && { marginLeft: -12 }
                            ]}
                        />
                    ))}
                    {thumbnails.extraCount > 0 && (
                        <View style={[styles.thumbnail, styles.extraBadge, { marginLeft: -12 }]}>
                            <AppText variant="small" color={COLORS.surface} style={{ fontWeight: 'bold' }}>
                                +{thumbnails.extraCount}
                            </AppText>
                        </View>
                    )}
                    {cartCount > 0 && thumbnails.images.length === 0 && (
                        /* Fallback dot if no images provided */
                        <View style={styles.thumbnail} />
                    )}
                </View>

                <View style={styles.centerSection}>
                    <AppText variant="title" color={COLORS.surface} style={styles.viewCartText}>
                        View Cart
                    </AppText>
                </View>

                <View style={styles.rightSection}>
                    <View style={styles.arrowButton}>
                        <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 20,
        right: 20,
        ...SHADOWS.medium,
        zIndex: 1000,
        elevation: 10,
    },
    content: {
        backgroundColor: '#000',
        borderRadius: 30,
        paddingHorizontal: SPACING.m,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 60,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.2,
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: COLORS.border,
    },
    extraBadge: {
        backgroundColor: COLORS.textLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerSection: {
        flex: 2,
        alignItems: 'center',
    },
    viewCartText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    arrowButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
