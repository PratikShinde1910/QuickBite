import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, PersonalInfoForm } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export const Profile: React.FC<any> = ({ navigation }) => {
    const { user, logout } = useAuth();
    const [isPersonalInfoVisible, setIsPersonalInfoVisible] = React.useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const renderOption = (icon: keyof typeof Ionicons.glyphMap, title: string, onPress?: () => void, destructive = false) => (
        <TouchableOpacity style={styles.optionRow} onPress={destructive ? handleLogout : onPress}>
            <View style={[styles.iconContainer, destructive && { backgroundColor: '#FEF2F2' }]}>
                <Ionicons name={icon} size={22} color={destructive ? COLORS.error : COLORS.primary} />
            </View>
            <AppText variant="body" color={destructive ? COLORS.error : COLORS.text} style={styles.optionTitle}>
                {title}
            </AppText>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={50} color={COLORS.primary} />
                    </View>
                    <AppText variant="h2" style={styles.name}>{user?.name || 'User'}</AppText>
                    <AppText variant="body" color={COLORS.textLight}>{user?.email || ''}</AppText>
                </View>

                <View style={styles.section}>
                    <AppText variant="h3" style={styles.sectionTitle}>Account</AppText>
                    <View style={styles.card}>
                        {renderOption('person-outline', 'Personal Information', () => setIsPersonalInfoVisible(true))}
                        <View style={styles.divider} />
                        {renderOption('card-outline', 'Payment Methods')}
                        <View style={styles.divider} />
                        {renderOption('notifications-outline', 'Notifications')}
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="h3" style={styles.sectionTitle}>Support</AppText>
                    <View style={styles.card}>
                        {renderOption('help-buoy-outline', 'Help Center', () => navigation.navigate('HelpCenter'))}
                        <View style={styles.divider} />
                        {renderOption('document-text-outline', 'Terms of Service', () => navigation.navigate('TermsOfService'))}
                    </View>
                </View>

                <View style={[styles.section, { paddingBottom: Platform.OS === 'web' ? 120 : SPACING.xxl }]}>
                    <View style={styles.card}>
                        {renderOption('log-out-outline', 'Log Out', undefined, true)}
                    </View>
                </View>
            </ScrollView>

            <Modal visible={isPersonalInfoVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <PersonalInfoForm onClose={() => setIsPersonalInfoVisible(false)} />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.m,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.m,
        ...SHADOWS.medium,
    },
    name: {
        marginBottom: 4,
    },
    section: {
        paddingHorizontal: SPACING.m,
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        marginBottom: SPACING.s,
        marginLeft: SPACING.xs,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.m,
        ...SHADOWS.soft,
        overflow: 'hidden',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.round,
        backgroundColor: '#FFF3E0', // Light primary
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    optionTitle: {
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: SPACING.xl + 40, // align with text
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
