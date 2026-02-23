import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View, Platform } from 'react-native';
import { CategoryItem } from './CategoryItem';
import { SPACING } from '../theme';

interface Category {
    id: string;
    name: string;
    icon: string;
}

interface CategoriesSectionProps {
    data: Category[];
    selectedCategory: string | null;
    onSelectCategory: (id: string | null) => void;
}

export const CategoriesSection = React.memo(({ data, selectedCategory, onSelectCategory }: CategoriesSectionProps) => {

    const handleSelect = useCallback((id: string) => {
        // Toggle if currently selected, otherwise select
        onSelectCategory(id === selectedCategory ? null : id);
    }, [selectedCategory, onSelectCategory]);

    const renderItem = useCallback(({ item }: { item: Category }) => (
        <CategoryItem
            id={item.id}
            name={item.name}
            icon={item.icon}
            isSelected={selectedCategory === item.id}
            onPress={handleSelect}
        />
    ), [selectedCategory, handleSelect]);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={Platform.OS === 'web' ? styles.webListContent : undefined}
                bounces={true}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={5}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
    },
    webListContent: {
        gap: SPACING.m,
    },
});
