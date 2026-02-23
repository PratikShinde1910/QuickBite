import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppInput } from './AppInput';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../theme';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterPress: () => void;
}

export const SearchBar = React.memo(({ onSearch, onFilterPress }: SearchBarProps) => {
    const [localQuery, setLocalQuery] = useState('');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleChange = useCallback((text: string) => {
        setLocalQuery(text);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            onSearch(text);
        }, 500);
    }, [onSearch]);

    return (
        <View style={styles.searchRow}>
            <View style={{ flex: 1, marginRight: SPACING.s }}>
                <AppInput
                    placeholder="Search for restaurants..."
                    icon="search-outline"
                    value={localQuery}
                    onChangeText={handleChange}
                />
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
                <Ionicons name="options" size={24} color={COLORS.surface} />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterBtn: {
        backgroundColor: COLORS.primary,
        width: 50,
        height: 50,
        borderRadius: RADIUS.m,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
});
