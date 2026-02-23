import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { AppText } from './AppText';
import { COLORS, SPACING, SHADOWS } from '../theme';

interface CategoryItemProps {
    id: string;
    name: string;
    icon: string;
    isSelected: boolean;
    onPress: (id: string) => void;
}

export const CategoryItem = React.memo(({ id, name, icon, isSelected, onPress }: CategoryItemProps) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: isSelected ? 1.05 : 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }, [isSelected]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: isSelected ? 1.05 : 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress(id)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.iconContainer,
                    isSelected ? styles.iconContainerSelected : styles.iconContainerUnselected,
                    { transform: [{ scale: scaleAnim }] }
                ]}
            >
                <AppText style={styles.iconText}>{icon}</AppText>
            </Animated.View>
            <AppText
                variant="small"
                style={[
                    styles.label,
                    isSelected ? styles.labelSelected : styles.labelUnselected
                ]}
                numberOfLines={1}
            >
                {name}
            </AppText>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: SPACING.m,
        width: 85,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    iconContainerSelected: {
        backgroundColor: COLORS.primary,
        ...SHADOWS.medium,
    },
    iconContainerUnselected: {
        backgroundColor: COLORS.surface,
        ...SHADOWS.soft,
    },
    iconText: {
        fontSize: 34,
    },
    label: {
        textAlign: 'center',
        fontWeight: '500',
    },
    labelSelected: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    labelUnselected: {
        color: COLORS.textLight,
    },
});
