import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AppText, AppButton } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

const ORDER_STEPS = [
    { id: 'placed', label: 'Order Placed', time: '12:30 PM' },
    { id: 'preparing', label: 'Preparing', time: '12:35 PM' },
    { id: 'ready', label: 'Ready for Pickup', time: 'Est. 12:50 PM' },
    { id: 'completed', label: 'Completed', time: '--' },
];

export const OrderTracking: React.FC<any> = ({ navigation }) => {
    const route = useRoute<any>();
    const order = route?.params?.order;

    if (!order) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="warning-outline" size={48} color={COLORS.textLight} style={{ marginBottom: SPACING.m }} />
                <AppText variant="h2" style={{ marginBottom: SPACING.l }}>Order not found</AppText>
                <AppButton title="Go Back" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    const orderId = order?._id || 'Unknown';
    const restaurantName = order?.items?.[0]?.menuItem?.restaurant || 'Restaurant';
    const currentStatus = order?.status || 'Placed';

    const getActiveStepIndex = () => {
        switch (currentStatus) {
            case 'Completed': return 4; // all done
            case 'Ready for Pickup':
            case 'Ready': return 2;
            case 'Preparing': return 1;
            default: return 0; // Placed
        }
    };

    const activeIndex = getActiveStepIndex();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.headerTitle}>Track Order</AppText>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
                <View style={styles.orderCard}>
                    <AppText variant="h2">{restaurantName}</AppText>
                    <AppText variant="body" color={COLORS.textLight} style={styles.orderId}>Order #{orderId}</AppText>
                    <View style={styles.etaContainer}>
                        <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                        <AppText variant="title" color={COLORS.primary} style={styles.etaText}>
                            {currentStatus === 'Completed' ? 'Picked up' : 'Est. Pickup: 12:50 PM'}
                        </AppText>
                    </View>
                </View>

                <View style={styles.trackerContainer}>
                    {ORDER_STEPS.map((step, index) => {
                        const isCompleted = index < activeIndex;
                        const isActive = index === activeIndex;
                        const isLast = index === ORDER_STEPS.length - 1;

                        return (
                            <View key={step.id} style={styles.stepRow}>
                                <View style={styles.stepIndicator}>
                                    <View style={[
                                        styles.dot,
                                        isCompleted ? styles.dotCompleted : isActive ? styles.dotActive : styles.dotPending
                                    ]}>
                                        {isCompleted && <Ionicons name="checkmark" size={14} color={COLORS.surface} />}
                                    </View>
                                    {!isLast && (
                                        <View style={[
                                            styles.line,
                                            isCompleted ? styles.lineCompleted : styles.linePending
                                        ]} />
                                    )}
                                </View>
                                <View style={[styles.stepContent, isLast && styles.lastStepContent]}>
                                    <AppText variant="h3" color={isActive || isCompleted ? COLORS.text : COLORS.textLight}>
                                        {step.label}
                                    </AppText>
                                    <AppText variant="caption" style={styles.stepTime}>
                                        {isActive ? 'In Progress' : step.time}
                                    </AppText>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <AppButton
                    title="Back to Home"
                    style={styles.directionsBtn}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })}
                />
            </View>
        </View>
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
        paddingHorizontal: SPACING.m,
        paddingBottom: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.soft,
    },
    headerTitle: {
        marginBottom: 0,
    },
    orderCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderRadius: RADIUS.m,
        ...SHADOWS.medium,
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    orderId: {
        marginTop: SPACING.xs,
        marginBottom: SPACING.m,
    },
    etaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        borderRadius: RADIUS.round,
    },
    etaText: {
        marginLeft: SPACING.s,
    },
    trackerContainer: {
        paddingHorizontal: SPACING.l,
        marginTop: SPACING.m,
    },
    stepRow: {
        flexDirection: 'row',
    },
    stepIndicator: {
        alignItems: 'center',
        width: 24,
    },
    dot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    dotCompleted: {
        backgroundColor: COLORS.success,
    },
    dotActive: {
        backgroundColor: COLORS.primary,
        borderWidth: 4,
        borderColor: COLORS.primaryLight,
    },
    dotPending: {
        backgroundColor: COLORS.border,
    },
    line: {
        width: 2,
        height: 50,
        marginVertical: 4,
        zIndex: 1,
    },
    lineCompleted: {
        backgroundColor: COLORS.success,
    },
    linePending: {
        backgroundColor: COLORS.border,
    },
    stepContent: {
        flex: 1,
        marginLeft: SPACING.l,
        paddingBottom: 40,
    },
    lastStepContent: {
        paddingBottom: 0,
    },
    stepTime: {
        marginTop: 4,
    },
    scrollContent: {
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'web' ? 120 : SPACING.xl,
    },
    footer: {
        padding: SPACING.m,
        paddingBottom: SPACING.xl,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    directionsBtn: {
        width: '100%',
    },
});
