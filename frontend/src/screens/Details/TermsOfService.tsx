import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export const TermsOfService: React.FC<any> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.headerTitle}>Terms of Service</AppText>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <AppText variant="h3" style={styles.sectionTitle}>1. Acceptance of Terms</AppText>
                <AppText variant="body" color={COLORS.textLight} style={styles.paragraph}>
                    By accessing and using the QuickBite application, you align yourself within the operational boundaries established by these Terms. If you do not agree with any element of these Terms, you may not use the Service.
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>2. User Accounts</AppText>
                <AppText variant="body" color={COLORS.textLight} style={styles.paragraph}>
                    To explore the full spectrum of our services, you must register for an account. You are responsible for safeguarding your password and any consequential activities on the app.
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>3. Ordering and Payment</AppText>
                <AppText variant="body" color={COLORS.textLight} style={styles.paragraph}>
                    All prices quoted through the platform are exclusive to delivery and service charges unless expressly stated otherwise. You must verify accuracy of all requested items before executing payment.
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>4. Limitations of Liability</AppText>
                <AppText variant="body" color={COLORS.textLight} style={styles.paragraph}>
                    QuickBite acts as an intermediary interface between independent restaurants and users. We cannot guarantee absolute accuracy of menu information nor assume liability for food quality.
                </AppText>

                <AppText variant="body" color={COLORS.textLight} style={styles.updateText}>
                    Last Updated: October 2026
                </AppText>
            </ScrollView>
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
    content: {
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'web' ? 120 : SPACING.xl,
    },
    sectionTitle: {
        marginBottom: SPACING.xs,
    },
    paragraph: {
        marginBottom: SPACING.l,
        lineHeight: 22,
    },
    updateText: {
        marginTop: SPACING.l,
        textAlign: 'center',
        fontStyle: 'italic',
    }
});
