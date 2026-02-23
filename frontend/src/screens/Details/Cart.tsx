import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppButton, CartItemCard } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { CartContext, CartItem } from '../../context/CartContext';

export const Cart: React.FC<any> = ({ navigation }) => {
    const { items, updateQuantity, clearCart, cartTotal: subtotal } = useContext(CartContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);

            const payload = {
                items: items.map(item => ({
                    menuItem: item.menuItemId || item._id, // Send clean ObjectId
                    quantity: item.quantity
                })),
                totalAmount: Number(total.toFixed(2))
            };

            console.log('Sending order payload:', JSON.stringify(payload, null, 2));
            await api.post('/orders', payload);
            clearCart();
            navigation.navigate('OrderSuccess');
        } catch (error: any) {
            Alert.alert('Checkout Failed', error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <CartItemCard
            item={item}
            onUpdateQuantity={updateQuantity}
        />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
                    <Ionicons name="close" size={28} color={COLORS.text} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.title}>Your Cart</AppText>
                <View style={{ width: 28 }} />
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={64} color={COLORS.border} />
                    <AppText variant="h2" style={{ marginTop: SPACING.m }}>Cart is Empty</AppText>
                    <AppButton
                        title="Browse Menu"
                        style={{ marginTop: SPACING.xl }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.footer}>
                        <View style={styles.summaryRow}>
                            <AppText variant="body" color={COLORS.textLight}>Subtotal</AppText>
                            <AppText variant="body" style={styles.summaryValue}>${subtotal.toFixed(2)}</AppText>
                        </View>
                        <View style={styles.summaryRow}>
                            <AppText variant="body" color={COLORS.textLight}>Taxes (8%)</AppText>
                            <AppText variant="body" style={styles.summaryValue}>${tax.toFixed(2)}</AppText>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <AppText variant="h2">Total</AppText>
                            <AppText variant="h2" color={COLORS.primary}>${total.toFixed(2)}</AppText>
                        </View>

                        <AppButton
                            title={isCheckingOut ? "Processing..." : "Place Pickup Order"}
                            style={styles.checkoutBtn}
                            onPress={handleCheckout}
                            disabled={isCheckingOut}
                        />
                    </View>
                </>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.m,
    },
    backBtn: {
        padding: SPACING.xs,
    },
    title: {},
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    listContent: {
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'web' ? 160 : SPACING.xl,
    },
    footer: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderTopLeftRadius: RADIUS.l,
        borderTopRightRadius: RADIUS.l,
        ...SHADOWS.medium,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.m,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.m,
    },
    checkoutBtn: {
        marginTop: SPACING.m,
        height: 55,
        borderRadius: 20,
    },
    summaryValue: {
        fontWeight: 'bold',
    },
});
