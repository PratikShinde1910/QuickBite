import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppText, AppButton } from '../../components';
import { COLORS, SPACING, RADIUS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export const OrderSuccess: React.FC<any> = ({ navigation }) => {
    const orderId = `QB-${Math.floor(Math.random() * 900000) + 100000}`;

    const handleBackToHome = () => {
        // Navigate safely back to main tabs
        navigation.popToTop();
        navigation.navigate('MainTabs');
    };

    const handleTrackOrder = () => {
        navigation.popToTop();
        navigation.navigate('MainTabs', { screen: 'Orders' });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark" size={60} color={COLORS.surface} />
                </View>

                <AppText variant="h1" style={styles.title}>Order Confirmed!</AppText>
                <AppText variant="body" color={COLORS.textLight} align="center" style={styles.subtitle}>
                    Your order has been sent to the restaurant and is now being prepared.
                </AppText>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <AppText variant="body" color={COLORS.textLight}>Order ID</AppText>
                        <AppText variant="title">{orderId}</AppText>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <AppText variant="body" color={COLORS.textLight}>Estimated Pickup time</AppText>
                        <AppText variant="title" color={COLORS.primary}>15 - 20 mins</AppText>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <AppButton title="Track Order" variant="outline" style={styles.trackBtn} onPress={handleTrackOrder} />
                <AppButton title="Back to Home" onPress={handleBackToHome} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.xl,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.success,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        shadowColor: COLORS.success,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    title: {
        marginBottom: SPACING.m,
    },
    subtitle: {
        marginBottom: SPACING.xxl,
    },
    infoCard: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.m,
        padding: SPACING.l,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.s,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.s,
    },
    footer: {
        padding: SPACING.xl,
    },
    trackBtn: {
        marginBottom: SPACING.m,
    },
});
