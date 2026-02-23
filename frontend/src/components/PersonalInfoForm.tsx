import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppText, AppInput, AppButton } from './';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface PersonalInfoFormProps {
    onClose: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onClose }) => {
    const { user, login, token } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | null>(user?.gender || null);

    // Parse DOB or default to twenty years ago
    const [dob, setDob] = useState<Date>(user?.dob ? new Date(user.dob) : new Date(new Date().setFullYear(new Date().getFullYear() - 20)));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Name is required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await api.put('/users/profile', {
                name,
                gender,
                dob: dob.toISOString(),
            });

            // The backend returns the updated user. We must merge it if needed, or just set it.
            // But we need to ensure Favorites or other fields aren't completely lost if missing from the response.
            // Actually, the backend response looks like: { _id, name, email, gender, dob }
            // Let's merge it:
            if (token) {
                const updatedUser = { ...user, ...response.data };
                await login(token, updatedUser); // Persist manually triggered context update.
                onClose();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText variant="h2">Personal Information</AppText>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {error && <AppText style={styles.errorText} color={COLORS.error}>{error}</AppText>}

                <AppText variant="title" style={styles.label}>Name</AppText>
                <AppInput
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    icon="person-outline"
                />

                <AppText variant="title" style={[styles.label, { marginTop: SPACING.l }]}>Gender</AppText>
                <View style={styles.genderRow}>
                    {['Male', 'Female', 'Other'].map(option => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.genderBtn,
                                gender === option && styles.genderBtnSelected
                            ]}
                            onPress={() => setGender(option as any)}
                        >
                            <AppText
                                style={[
                                    styles.genderText,
                                    gender === option && styles.genderTextSelected
                                ]}
                            >
                                {option}
                            </AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                <AppText variant="title" style={[styles.label, { marginTop: SPACING.l }]}>Date of Birth</AppText>
                <TouchableOpacity
                    style={styles.datePickerBtn}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Ionicons name="calendar-outline" size={20} color={COLORS.textLight} />
                    <AppText style={styles.dateText}>
                        {dob.toLocaleDateString()}
                    </AppText>
                </TouchableOpacity>

                {showDatePicker && (
                    <View style={Platform.OS === 'ios' && styles.iosDatePickerContainer}>
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display={Platform.OS === 'ios' ? "spinner" : "default"}
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                        {Platform.OS === 'ios' && (
                            <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.iosDatePickerDoneBtn}>
                                <AppText color={COLORS.primary} style={{ fontWeight: 'bold' }}>Done</AppText>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <AppButton
                    title={loading ? "Saving..." : "Save Changes"}
                    onPress={handleSave}
                    disabled={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        marginTop: 60, // Leave some space at the top of the modal
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    closeBtn: {
        padding: SPACING.xs,
    },
    scrollContent: {
        padding: SPACING.m,
    },
    label: {
        marginBottom: SPACING.xs,
        marginLeft: SPACING.xs,
    },
    genderRow: {
        flexDirection: 'row',
        gap: SPACING.s,
    },
    genderBtn: {
        flex: 1,
        paddingVertical: SPACING.m,
        borderRadius: RADIUS.m,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    genderBtnSelected: {
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderColor: COLORS.primary,
    },
    genderText: {
        color: COLORS.text,
    },
    genderTextSelected: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    datePickerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.m,
        padding: SPACING.m,
    },
    dateText: {
        marginLeft: SPACING.s,
        color: COLORS.text,
    },
    iosDatePickerContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.m,
        marginTop: SPACING.m,
        padding: SPACING.s,
        ...SHADOWS.soft,
    },
    iosDatePickerDoneBtn: {
        alignItems: 'flex-end',
        padding: SPACING.s,
    },
    footer: {
        padding: SPACING.m,
        paddingBottom: SPACING.xl,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    errorText: {
        textAlign: 'center',
        marginBottom: SPACING.m,
    },
});
