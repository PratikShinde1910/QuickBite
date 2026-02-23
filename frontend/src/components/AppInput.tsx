import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { COLORS, RADIUS, SPACING } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

export const AppInput: React.FC<AppInputProps> = ({
    label,
    error,
    icon,
    style,
    ...props
}) => {
    return (
        <View style={styles.container}>
            {label && (
                <AppText variant="small" style={styles.label}>
                    {label}
                </AppText>
            )}
            <View style={[
                styles.inputContainer,
                error ? styles.inputError : null,
            ]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={COLORS.textLight}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.textLight}
                    selectionColor={COLORS.primary}
                    {...props}
                />
            </View>
            {error && (
                <AppText variant="small" color={COLORS.error} style={styles.errorText}>
                    {error}
                </AppText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
    },
    label: {
        marginBottom: SPACING.xs,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.m,
        height: 56,
        paddingHorizontal: SPACING.m,
    },
    inputError: {
        borderColor: COLORS.error,
        backgroundColor: '#FEF2F2',
    },
    icon: {
        marginRight: SPACING.s,
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        height: '100%',
    },
    errorText: {
        marginTop: 4,
        marginLeft: 4,
    },
});
