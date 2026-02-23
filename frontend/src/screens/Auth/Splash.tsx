import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { AppText } from '../../components';
import { COLORS, SPACING } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export const Splash: React.FC<any> = ({ navigation }) => {
    useEffect(() => {
        // Simulate loading/auth check then navigate to Login
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Ionicons name="fast-food" size={80} color={COLORS.primary} />
                </View>
                <AppText variant="h1" color={COLORS.primary} style={styles.title}>
                    QuickBite
                </AppText>
                <AppText variant="title" color={COLORS.textLight}>
                    Campus Food Delivery
                </AppText>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        backgroundColor: COLORS.surface,
        padding: SPACING.xl,
        borderRadius: 100,
        marginBottom: SPACING.l,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    title: {
        marginBottom: SPACING.xs,
    },
});
