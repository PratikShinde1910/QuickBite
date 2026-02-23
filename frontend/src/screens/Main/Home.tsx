import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator, RefreshControl, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, RestaurantCard, AppButton, MiniCartBar, SearchBar, CategoriesSection } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { CATEGORIES } from '../../data/mockData';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useDebounce } from '../../hooks/useDebounce'; // Assuming useDebounce is available here or needs to be added

export const Home: React.FC<any> = ({ navigation }) => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    const { width: windowWidth } = useWindowDimensions();
    const isWeb = Platform.OS === 'web';
    const numColumns = isWeb && windowWidth > 768 ? 3 : isWeb && windowWidth > 480 ? 2 : 1;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState<'rating' | 'time' | null>(null);

    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRestaurants = async (search: string = '') => {
        try {
            setLoading(true);
            setError(null);

            const params: any = {};
            if (search.trim() !== '') {
                params.search = search.trim();
            }

            const response = await api.get('/restaurants', { params });
            setRestaurants(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants(debouncedQuery);
    }, [debouncedQuery]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchRestaurants(debouncedQuery);
        setRefreshing(false);
    }, [debouncedQuery]);

    const renderHeader = () => (
        <View style={styles.header}>
            <AppText variant="h3" style={styles.sectionTitle}>Categories</AppText>
            <CategoriesSection
                data={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <AppText variant="h3" style={styles.sectionTitle}>
                All Restaurants
            </AppText>
        </View>
    );

    let filteredRestaurants = [...restaurants];

    // Client-side category filtering based on the DB payload
    if (selectedCategory) {
        const selectedCatName = CATEGORIES.find(c => c.id === selectedCategory)?.name || '';
        filteredRestaurants = filteredRestaurants.filter(r => {
            return r.categories ? r.categories.includes(selectedCatName) : r.category?.includes(selectedCatName);
        });
    }

    if (sortBy === 'rating') {
        filteredRestaurants.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'time') {
        // Simple string parsing for mockup (e.g., "5-10 min" -> 5)
        filteredRestaurants.sort((a, b) => {
            const timeA = a.pickupTime ? parseInt(a.pickupTime.split('-')[0]) : 0;
            const timeB = b.pickupTime ? parseInt(b.pickupTime.split('-')[0]) : 0;
            return timeA - timeB;
        });
    }

    return (
        <SafeAreaView style={[styles.container, isWeb && styles.webContainerBg]} edges={['top']}>
            <View style={styles.webMaxWidthWrapper}>
                <View style={[styles.fixedHeader, isWeb && styles.webHeaderSpacing]}>
                    <View style={styles.greetingRow}>
                        <View>
                            <AppText variant="title">Good Evening,</AppText>
                            <AppText variant="h2" color={COLORS.primary}>{user?.name || "Guest"}</AppText>
                        </View>
                        <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')}>
                            <Ionicons name="person-circle-outline" size={40} color={COLORS.textLight} />
                        </TouchableOpacity>
                    </View>
                    <SearchBar
                        onSearch={setSearchQuery}
                        onFilterPress={() => setIsFilterModalVisible(true)}
                    />
                </View>

                <FlatList
                    data={filteredRestaurants}
                    keyExtractor={item => item._id || item.id}
                    renderItem={({ item }) => (
                        <RestaurantCard
                            restaurant={item}
                            onPress={() => navigation.navigate('RestaurantDetails', { restaurantId: item._id || item.id })}
                        />
                    )}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={() => {
                        if (loading) {
                            return (
                                <View style={styles.centerContainer}>
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                </View>
                            );
                        }
                        if (error) {
                            return (
                                <View style={styles.errorCard}>
                                    <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                                    <AppText variant="h3" style={styles.errorText}>{error}</AppText>
                                    <AppButton title="Retry" onPress={() => fetchRestaurants(debouncedQuery)} style={styles.retryBtn} />
                                </View>
                            );
                        }
                        return (
                            <View style={styles.centerContainer}>
                                <AppText>No restaurants found.</AppText>
                            </View>
                        );
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[COLORS.primary]}
                            tintColor={COLORS.primary}
                        />
                    }
                    key={numColumns} // Force re-render on column change
                    numColumns={numColumns}
                    columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Modal
                visible={isFilterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsFilterModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsFilterModalVisible(false)}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <AppText variant="h2">Filter & Sort</AppText>
                            <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                                <Ionicons name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <AppText variant="title" style={styles.filterSectionTitle}>Sort By</AppText>
                        <View style={styles.filterOptionsRow}>
                            <TouchableOpacity
                                style={[styles.filterOptionBtn, sortBy === 'rating' && styles.filterOptionBtnSelected]}
                                onPress={() => setSortBy(sortBy === 'rating' ? null : 'rating')}
                            >
                                <Ionicons name="star-outline" size={18} color={sortBy === 'rating' ? COLORS.surface : COLORS.text} />
                                <AppText style={[styles.filterOptionText, sortBy === 'rating' && styles.filterOptionTextSelected]}> Rating</AppText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.filterOptionBtn, sortBy === 'time' && styles.filterOptionBtnSelected]}
                                onPress={() => setSortBy(sortBy === 'time' ? null : 'time')}
                            >
                                <Ionicons name="time-outline" size={18} color={sortBy === 'time' ? COLORS.surface : COLORS.text} />
                                <AppText style={[styles.filterOptionText, sortBy === 'time' && styles.filterOptionTextSelected]}> Pickup Time</AppText>
                            </TouchableOpacity>
                        </View>

                        <AppText variant="title" style={styles.filterSectionTitle}>Category</AppText>
                        <View style={styles.filterCategoriesGrid}>
                            {CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[styles.filterOptionBtn, selectedCategory === cat.id && styles.filterOptionBtnSelected]}
                                    onPress={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                                >
                                    <AppText style={[styles.filterOptionText, selectedCategory === cat.id && styles.filterOptionTextSelected]}>
                                        {cat.icon} {cat.name}
                                    </AppText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.filterActionsRow}>
                            <AppButton
                                title="Reset"
                                variant="outline"
                                style={styles.filterResetBtn}
                                onPress={() => { setSortBy(null); setSelectedCategory(null); }}
                            />
                            <AppButton
                                title="Apply Filters"
                                style={styles.filterApplyBtn}
                                onPress={() => setIsFilterModalVisible(false)}
                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
            <MiniCartBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centerContainer: {
        padding: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderRadius: RADIUS.l,
        alignItems: 'center',
        marginVertical: SPACING.m,
        ...SHADOWS.soft,
    },
    errorText: {
        color: COLORS.text,
        textAlign: 'center',
        marginTop: SPACING.m,
        marginBottom: SPACING.l,
    },
    retryBtn: {
        minWidth: 120,
    },
    listContent: {
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'web' ? 80 : 150,
        alignItems: Platform.OS === 'web' ? 'stretch' : 'stretch',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    webContainerBg: {
        backgroundColor: '#f8f9fb',
    },
    webMaxWidthWrapper: {
        flex: 1,
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
        paddingHorizontal: Platform.OS === 'web' ? 24 : 0,
        paddingTop: Platform.OS === 'web' ? 40 : 0,
    },
    webHeaderSpacing: {
        paddingTop: SPACING.l,
    },
    header: {
        marginBottom: SPACING.m,
    },
    fixedHeader: {
        paddingHorizontal: Platform.OS === 'web' ? 0 : SPACING.m,
        paddingTop: Platform.OS === 'web' ? 0 : SPACING.s,
        backgroundColor: Platform.OS === 'web' ? 'transparent' : COLORS.background,
        zIndex: 10,
    },
    greetingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    profileBtn: {
        padding: SPACING.xs,
        marginRight: -SPACING.xs, // aligns icon neatly
    },
    sectionTitle: {
        marginBottom: SPACING.m,
        marginTop: SPACING.s,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        padding: SPACING.l,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    filterSectionTitle: {
        marginBottom: SPACING.s,
    },
    filterOptionsRow: {
        flexDirection: 'row',
        marginBottom: SPACING.l,
        gap: SPACING.s,
    },
    filterCategoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: SPACING.xl,
        gap: SPACING.s,
    },
    filterOptionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        borderRadius: RADIUS.m,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterOptionBtnSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterOptionText: {
        color: COLORS.text,
    },
    filterOptionTextSelected: {
        color: COLORS.surface,
        fontWeight: 'bold',
    },
    filterActionsRow: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    filterResetBtn: {
        flex: 1,
    },
    filterApplyBtn: {
        flex: 2,
    },
});
