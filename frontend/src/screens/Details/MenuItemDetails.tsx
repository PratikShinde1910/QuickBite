import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, AppButton } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';

export const MenuItemDetails: React.FC<any> = ({ route, navigation }) => {
    const { item } = route.params;
    const { addToCart } = React.useContext(CartContext);
    const insets = useSafeAreaInsets();

    const [selectedVariation, setSelectedVariation] = useState('Medium');
    const [quantity, setQuantity] = useState(1);

    const variations = [
        { id: 'Small', name: 'Small', priceMultiplier: 0.8 },
        { id: 'Medium', name: 'Medium', priceMultiplier: 1.0 },
        { id: 'Large', name: 'Large', priceMultiplier: 1.2 },
    ];

    const getCalculatedPrice = () => {
        const v = variations.find(v => v.id === selectedVariation);
        const base = item.price || 0;
        return (base * (v ? v.priceMultiplier : 1.0));
    };

    const calculatedPrice = getCalculatedPrice();
    const totalPrice = calculatedPrice * quantity;

    const handleAddToCart = () => {
        addToCart({
            menuItemId: item._id || item.id,
            name: item.name,
            selectedVariation,
            quantity,
            calculatedPrice,
            image: item.image
        });
        navigation.navigate('Cart');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="share-outline" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconBtn, { marginLeft: SPACING.s }]}>
                        <Ionicons name="heart-outline" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]} showsVerticalScrollIndicator={false}>
                <View style={Platform.OS === 'web' ? styles.webRootContainer : {}}>
                    <View style={Platform.OS === 'web' ? styles.webFlexRow : {}}>

                        {/* LEFT COLUMN (Web) / Top Flow (Mobile) */}
                        <View style={Platform.OS === 'web' ? styles.webLeftCol : {}}>
                            {/* Hero Image Section */}
                            <View style={[styles.heroContainer, Platform.OS === 'web' && styles.webHeroContainer]}>
                                <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
                                <View style={[styles.priceBadge, Platform.OS === 'web' && styles.webPriceBadge]}>
                                    <AppText variant="h3" color={COLORS.surface}>${item.price?.toFixed(2)}</AppText>
                                </View>
                            </View>
                        </View>

                        {/* RIGHT COLUMN (Web) / Bottom Flow (Mobile) */}
                        <View style={Platform.OS === 'web' ? styles.webRightCol : {}}>

                            {/* Food Details Section */}
                            <View style={[styles.detailsSection, Platform.OS === 'web' && styles.webDetailsSection]}>
                                <AppText variant="h1" style={[styles.title, Platform.OS === 'web' && styles.webTitle]}>{item.name}</AppText>
                                <View style={styles.infoRow}>
                                    <AppText variant="body" style={styles.calories}>🔥 271 Cal.</AppText>
                                    <AppText variant="small" color="#F97316" style={styles.deliveryFee}>Free delivery</AppText>
                                </View>

                                {item.description && (
                                    <AppText variant="body" color={COLORS.textLight} style={styles.description}>
                                        {item.description}
                                    </AppText>
                                )}

                                <AppText variant="h3" style={styles.sectionHeading}>Ingredients</AppText>
                                <View style={styles.ingredientsList}>
                                    <AppText variant="body" color={COLORS.textLight}>• Fresh ingredients</AppText>
                                    <AppText variant="body" color={COLORS.textLight}>• Secret spices</AppText>
                                    <AppText variant="body" color={COLORS.textLight}>• Organic produce</AppText>
                                </View>
                            </View>

                            {/* Variation Selection */}
                            <View style={[styles.variationCard, Platform.OS === 'web' && styles.webVariationCard]}>
                                <AppText variant="h3" style={styles.variationTitle}>Variation</AppText>
                                {variations.map(vari => {
                                    const isSelected = selectedVariation === vari.id;
                                    const vPrice = (item.price || 0) * vari.priceMultiplier;
                                    return (
                                        <TouchableOpacity
                                            key={vari.id}
                                            style={[
                                                styles.variationRow,
                                                Platform.OS === 'web' && styles.webVariationRow,
                                                isSelected && styles.variationRowSelected,
                                                isSelected && Platform.OS === 'web' && styles.webVariationRowSelected
                                            ]}
                                            onPress={() => setSelectedVariation(vari.id)}
                                        >
                                            <View style={styles.variationLeft}>
                                                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                                                    {isSelected && <View style={styles.radioInner} />}
                                                </View>
                                                <AppText variant="body">{vari.name}</AppText>
                                            </View>
                                            <AppText variant="body" style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                                                ${vPrice.toFixed(2)}
                                            </AppText>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {/* Inline Add to Cart (Web Only) */}
                            {Platform.OS === 'web' && (
                                <View style={styles.webInlineCartBar}>
                                    <View style={styles.stepperControl}>
                                        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.stepperBtn}>
                                            <Ionicons name="remove" size={24} color={COLORS.text} />
                                        </TouchableOpacity>
                                        <AppText variant="h2" style={styles.stepperValue}>{quantity}</AppText>
                                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.stepperBtn}>
                                            <Ionicons name="add" size={24} color={COLORS.text} />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={[styles.addToCartBtn, styles.webAddToCartBtn]} activeOpacity={0.8} onPress={handleAddToCart}>
                                        <AppText variant="h3" color={COLORS.surface}>Add to Cart</AppText>
                                        <AppText variant="h3" color={COLORS.surface}>${totalPrice.toFixed(2)}</AppText>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        {Platform.OS !== 'web' && <View style={{ height: 120 }} />}

                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Fixed Bottom Bar (Mobile Only) */}
            {Platform.OS !== 'web' && (
                <View style={styles.bottomBar}>
                    <View style={styles.stepperControl}>
                        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.stepperBtn}>
                            <Ionicons name="remove" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                        <AppText variant="h2" style={styles.stepperValue}>{quantity}</AppText>
                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.stepperBtn}>
                            <Ionicons name="add" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8} onPress={handleAddToCart}>
                        <AppText variant="h3" color={COLORS.surface}>Add to Cart</AppText>
                        <AppText variant="h3" color={COLORS.surface}>${totalPrice.toFixed(2)}</AppText>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.soft,
    },
    rightIcons: {
        flexDirection: 'row',
    },
    scrollContent: {
        paddingBottom: Platform.OS === 'web' ? 120 : SPACING.xl,
    },
    heroContainer: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: SPACING.l,
        backgroundColor: COLORS.surface,
        ...SHADOWS.soft,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    priceBadge: {
        position: 'absolute',
        bottom: SPACING.m,
        left: SPACING.m,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.m,
    },
    detailsSection: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.l,
        padding: SPACING.l,
        marginBottom: SPACING.l,
        ...SHADOWS.soft,
    },
    title: {
        marginBottom: SPACING.xs,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    calories: {
        marginRight: SPACING.m,
    },
    deliveryFee: {
        fontWeight: 'bold',
    },
    description: {
        marginBottom: SPACING.m,
        lineHeight: 22,
    },
    sectionHeading: {
        marginBottom: SPACING.s,
    },
    ingredientsList: {
        marginLeft: SPACING.xs,
    },
    variationCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.l,
        padding: SPACING.l,
        ...SHADOWS.soft,
    },
    variationTitle: {
        marginBottom: SPACING.m,
    },
    variationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.s,
        borderRadius: RADIUS.m,
    },
    variationRowSelected: {
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
    },
    variationLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.textLight,
        marginRight: SPACING.s,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: COLORS.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'web' ? SPACING.xxl : SPACING.xl,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    stepperControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.m,
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.round,
        padding: 4,
    },
    stepperBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: COLORS.surface,
        ...SHADOWS.soft,
    },
    stepperValue: {
        width: 30,
        textAlign: 'center',
    },
    addToCartBtn: {
        flex: 1,
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        ...SHADOWS.medium,
    },
    // --- Web Specific Overrides ---
    webScrollContent: {
        paddingBottom: 40,
    },
    webRootContainer: {
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    webFlexRow: {
        flexDirection: 'row',
        gap: 40,
        alignItems: 'flex-start',
    },
    webLeftCol: {
        width: '60%',
    },
    webRightCol: {
        width: '40%',
    },
    webHeroContainer: {
        height: 420,
        borderRadius: 20,
        marginBottom: 0,
        ...SHADOWS.medium,
    },
    webPriceBadge: {
        top: SPACING.l,
        bottom: 'auto',
        left: SPACING.l,
    },
    webDetailsSection: {
        marginBottom: SPACING.m,
        padding: 0,
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    webTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: SPACING.s,
    },
    webVariationCard: {
        padding: 0,
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    webVariationRow: {
        backgroundColor: COLORS.surface,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 12,
        ...SHADOWS.soft,
    },
    webVariationRowSelected: {
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    webInlineCartBar: {
        width: '100%',
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    webAddToCartBtn: {
        height: 56,
        borderRadius: 14,
    },
});
