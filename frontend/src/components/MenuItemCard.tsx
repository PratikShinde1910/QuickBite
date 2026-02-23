import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { AppText } from './AppText';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme';
import { MenuItem } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

interface MenuItemCardProps {
    item: MenuItem;
    onPress?: () => void;
    onAddPressed?: () => void;
    style?: ViewStyle;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    item,
    onPress,
    onAddPressed,
    style,
}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.content}>
                <AppText variant="title" style={styles.name}>
                    {item.name}
                </AppText>
                <AppText variant="h3" color={COLORS.primary} style={styles.price}>
                    ${item.price.toFixed(2)}
                </AppText>
                {item.description && (
                    <AppText variant="caption" numberOfLines={2}>
                        {item.description}
                    </AppText>
                )}
                <TouchableOpacity style={styles.addButton} onPress={onAddPressed}>
                    <Ionicons name="add" size={16} color={COLORS.surface} />
                    <AppText variant="small" color={COLORS.surface} style={styles.buttonText}>
                        Add
                    </AppText>
                </TouchableOpacity>
            </View>
            <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: RADIUS.m,
        marginBottom: SPACING.m,
        ...SHADOWS.soft,
    },
    content: {
        flex: 1,
        paddingRight: SPACING.m,
        justifyContent: 'center',
    },
    name: {
        marginBottom: SPACING.xs,
    },
    price: {
        marginBottom: SPACING.s,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: RADIUS.m,
        backgroundColor: COLORS.border,
    },
    addButton: {
        marginTop: SPACING.s,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.m,
        paddingVertical: 6,
        borderRadius: RADIUS.round,
    },
    buttonText: {
        marginLeft: 4,
        fontWeight: 'bold',
    },
});
