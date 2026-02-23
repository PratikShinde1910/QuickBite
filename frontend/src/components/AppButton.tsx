import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { AppText } from './AppText';
import { COLORS, RADIUS, SPACING } from '../theme';

interface AppButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'outline' | 'ghost';
    loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    variant = 'primary',
    loading = false,
    style,
    disabled,
    ...props
}) => {
    const getContainerStyle = (): ViewStyle => {
        switch (variant) {
            case 'outline':
                return styles.outlineContainer;
            case 'ghost':
                return styles.ghostContainer;
            case 'primary':
            default:
                return styles.primaryContainer;
        }
    };

    const getTextColor = (): string => {
        if (disabled) return COLORS.textLight;
        switch (variant) {
            case 'outline':
            case 'ghost':
                return COLORS.primary;
            case 'primary':
            default:
                return COLORS.surface;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.baseContainer,
                getContainerStyle(),
                disabled && styles.disabledContainer,
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <AppText variant="title" color={getTextColor()} style={styles.text}>
                    {title}
                </AppText>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    baseContainer: {
        height: 56,
        borderRadius: RADIUS.m,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        flexDirection: 'row',
    },
    primaryContainer: {
        backgroundColor: COLORS.primary,
    },
    outlineContainer: {
        backgroundColor: COLORS.transparent,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    ghostContainer: {
        backgroundColor: COLORS.transparent,
        height: 'auto',
        paddingHorizontal: SPACING.s,
    },
    disabledContainer: {
        backgroundColor: COLORS.border,
        borderColor: COLORS.border,
    },
    text: {
        fontWeight: '600',
    },
});
