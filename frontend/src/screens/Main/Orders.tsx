import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppButton } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

interface Order {
    _id: string; // From backend
    status: 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
    totalAmount: number;
    createdAt: string;
    items: {
        menuItem: { name: string, restaurant: string }; // Assuming menuItem populated
        quantity: number;
        price: number;
    }[];
}

export const Orders: React.FC<any> = ({ navigation }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders/myorders');
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchOrders();
        setRefreshing(false);
    }, []);
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Ready':
            case 'Completed': return COLORS.success;
            case 'Preparing': return '#F59E0B'; // amber/orange
            case 'Cancelled': return '#EF4444'; // red
            default: return COLORS.textLight;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderOrderItem = ({ item }: { item: Order }) => {
        const firstRestaurantName = item.items?.[0]?.menuItem?.restaurant || 'Multiple Restaurants'; // Can adjust based on schema
        const itemsSummary = Array.isArray(item.items) ? item.items.map(i => `${i.quantity}x ${i.menuItem?.name || 'Item'}`).join(', ') : 'No items';

        return (
            <View style={styles.orderCard}>
                <View style={styles.headerRow}>
                    <AppText variant="h3">Order {item._id.slice(-6).toUpperCase()}</AppText>
                    <AppText variant="title" color={COLORS.primary}>${item.totalAmount.toFixed(2)}</AppText>
                </View>
                <AppText variant="caption" style={styles.date}>{formatDate(item.createdAt)}</AppText>
                <AppText variant="body" style={styles.items}>{itemsSummary}</AppText>
                <View style={styles.footerRow}>
                    <View style={styles.statusBadge}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                        <AppText variant="small" color={getStatusColor(item.status)} style={styles.statusText}>
                            {item.status}
                        </AppText>
                    </View>
                    <AppButton
                        title="Track"
                        variant="outline"
                        style={styles.reorderBtn}
                        onPress={() => navigation.navigate('OrderTracking', {
                            order: item
                        })}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <AppText variant="h1">Your Orders</AppText>
            </View>

            {loading && !refreshing ? (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={item => item._id}
                    renderItem={renderOrderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} tintColor={COLORS.primary} />
                    }
                />
            ) : (
                <ScrollView
                    contentContainerStyle={styles.emptyContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} tintColor={COLORS.primary} />}
                >
                    <Ionicons name="receipt-outline" size={64} color={COLORS.border} />
                    <AppText variant="h2" style={styles.emptyTitle}>No Orders Yet</AppText>
                    <AppText variant="body" color={COLORS.textLight} align="center">
                        Looks like you haven't placed {"\n"}any campus food orders.
                    </AppText>
                    <AppButton
                        title="Browse Restaurants"
                        style={styles.browseBtn}
                        onPress={() => navigation.navigate('Home')}
                    />
                </ScrollView>
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
    },
    orderCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: RADIUS.m,
        marginBottom: SPACING.m,
        ...SHADOWS.soft,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    date: {
        marginBottom: SPACING.s,
    },
    items: {
        marginBottom: SPACING.m,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: SPACING.m,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: RADIUS.s,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontWeight: '600',
    },
    reorderBtn: {
        height: 36,
        paddingHorizontal: SPACING.m,
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
        paddingBottom: Platform.OS === 'web' ? 120 : SPACING.xl,
    },
    emptyTitle: {
        marginTop: SPACING.m,
        marginBottom: SPACING.s,
    },
    browseBtn: {
        marginTop: SPACING.xl,
    },
});
