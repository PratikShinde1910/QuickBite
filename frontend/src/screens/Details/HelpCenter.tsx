import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export const HelpCenter: React.FC<any> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.headerTitle}>Help Center</AppText>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <AppText variant="h3" style={styles.sectionTitle}>Frequently Asked Questions</AppText>

                <View style={styles.card}>
                    <AppText variant="h3" style={styles.qText}>How do I track my order?</AppText>
                    <AppText variant="body" color={COLORS.textLight}>
                        You can track your order by navigating to the Orders tab and selecting your active order to see real-time updates.
                    </AppText>
                </View>

                <View style={styles.card}>
                    <AppText variant="h3" style={styles.qText}>What payment methods do you accept?</AppText>
                    <AppText variant="body" color={COLORS.textLight}>
                        We accept standard credit and debit cards, along with mobile wallets such as Apple Pay and Google Pay.
                    </AppText>
                </View>

                <View style={styles.card}>
                    <AppText variant="h3" style={styles.qText}>How can I cancel my order?</AppText>
                    <AppText variant="body" color={COLORS.textLight}>
                        Orders can only be canceled before the restaurant starts preparing your food. Please contact support immediately if you need assistance.
                    </AppText>
                </View>

                <AppText variant="h3" style={[styles.sectionTitle, { marginTop: SPACING.l }]}>Contact Support</AppText>

                <TouchableOpacity style={styles.contactBtn}>
                    <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
                    <AppText style={styles.contactText}>Email support@quickbite.com</AppText>
                </TouchableOpacity>

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
        paddingBottom: Platform.OS === 'web' ? 120 : SPACING.m,
    },
    sectionTitle: {
        marginBottom: SPACING.m,
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: RADIUS.m,
        marginBottom: SPACING.m,
        ...SHADOWS.soft,
    },
    qText: {
        marginBottom: SPACING.xs,
        fontSize: 16,
    },
    contactBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: RADIUS.m,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.soft,
    },
    contactText: {
        marginLeft: SPACING.m,
        fontWeight: 'bold',
        color: COLORS.primary,
    }
});
