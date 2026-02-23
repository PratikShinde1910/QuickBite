import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, MenuItemCard, AppButton, MiniCartBar } from '../../components';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { CartContext } from '../../context/CartContext';

export const RestaurantDetails: React.FC<any> = ({ route, navigation }) => {
    const { restaurantId } = route.params || {};

    const [restaurant, setRestaurant] = useState<any>(null);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { cartCount, addToCart, cartTotal } = useContext(CartContext);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [localReviews, setLocalReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const [restaurantRes, menuRes] = await Promise.all([
                    api.get(`/restaurants/${restaurantId}`),
                    api.get(`/menu/${restaurantId}`)
                ]);

                setRestaurant(restaurantRes.data);
                setMenuItems(menuRes.data);
                setLocalReviews(restaurantRes.data.reviews || []);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch restaurant details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (restaurantId) {
            fetchDetails();
        } else {
            setError('Invalid restaurant ID.');
            setLoading(false);
        }
    }, [restaurantId]);

    const submitReview = () => {
        if (!reviewComment.trim()) return;
        const newReview = {
            id: Date.now().toString(),
            user: 'Pratik S.', // Mocking the current logged-in user
            rating: reviewRating,
            comment: reviewComment,
        };
        setLocalReviews([newReview, ...localReviews]);
        setIsReviewModalVisible(false);
        setReviewComment('');
        setReviewRating(5);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContainer]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    if (error || !restaurant) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContainer]}>
                <View style={styles.errorCard}>
                    <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                    <AppText variant="h3" style={styles.errorText}>{error || 'Restaurant not found'}</AppText>
                    <AppButton title="Go Back" onPress={() => navigation.goBack()} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.heroContainer}>
                    <Image source={{ uri: restaurant.image }} style={styles.heroImage} />
                    <View style={[styles.headerControls, { paddingTop: SPACING.m }]}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <View>
                                <Ionicons name="cart-outline" size={24} color={COLORS.text} />
                                {cartCount > 0 && (
                                    <View style={styles.badge}>
                                        <AppText variant="small" color={COLORS.surface} style={{ fontSize: 10, fontWeight: 'bold' }}>
                                            {cartCount}
                                        </AppText>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <AppText variant="h1" style={styles.name}>{restaurant.name}</AppText>
                    <AppText variant="body" color={COLORS.textLight} style={styles.description}>
                        {restaurant.description}
                    </AppText>

                    <View style={styles.metaRow}>
                        <View style={styles.metaBadge}>
                            <Ionicons name="star" size={18} color="#FFB800" />
                            <AppText variant="body" style={styles.metaText}>{restaurant.rating}</AppText>
                        </View>
                        <View style={styles.metaBadge}>
                            <Ionicons name="time-outline" size={18} color={COLORS.textLight} />
                            <AppText variant="body" style={styles.metaText}>{restaurant.pickupTime}</AppText>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {menuItems.length > 0 ? (
                        <View style={styles.menuSection}>
                            <AppText variant="h2" style={styles.sectionTitle}>All Items</AppText>
                            {menuItems.map(item => (
                                <MenuItemCard
                                    key={item._id}
                                    item={item}
                                    onPress={() => navigation.navigate('MenuItemDetails', { item })}
                                    onAddPressed={() => addToCart(item)}
                                />
                            ))}
                        </View>
                    ) : (
                        <View style={styles.menuSection}>
                            <AppText variant="body" color={COLORS.textLight} align="center">
                                No menu items available.
                            </AppText>
                        </View>
                    )}

                    <View style={styles.divider} />

                    {/* Reviews Section */}
                    <View style={styles.reviewsSection}>
                        <View style={styles.reviewsHeader}>
                            <View>
                                <AppText variant="h2">Reviews</AppText>
                                <View style={styles.ratingSummaryRow}>
                                    <Ionicons name="star" size={16} color="#FFB800" />
                                    <AppText style={styles.ratingSummaryText}> {restaurant.rating} ({localReviews.length} reviews)</AppText>
                                </View>
                            </View>
                            <AppButton
                                title="Write Review"
                                variant="outline"
                                style={styles.writeReviewBtn}
                                onPress={() => setIsReviewModalVisible(true)}
                            />
                        </View>

                        {localReviews.length > 0 ? (
                            localReviews.map(review => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <View style={styles.reviewHeader}>
                                        <AppText variant="title">{review.user}</AppText>
                                        <View style={styles.reviewStars}>
                                            {[...Array(5)].map((_, i) => (
                                                <Ionicons
                                                    key={i}
                                                    name={i < review.rating ? "star" : "star-outline"}
                                                    size={14}
                                                    color="#FFB800"
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <AppText variant="body" color={COLORS.textLight}>{review.comment}</AppText>
                                </View>
                            ))
                        ) : (
                            <AppText variant="body" color={COLORS.textLight} align="center" style={{ marginVertical: SPACING.m }}>
                                No reviews yet. Be the first to review!
                            </AppText>
                        )}
                    </View>

                    <View style={{ height: 120 }} />
                </View>
            </ScrollView>

            {/* Review Modal */}
            <Modal
                visible={isReviewModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsReviewModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <AppText variant="h2">Write a Review</AppText>
                            <TouchableOpacity onPress={() => setIsReviewModalVisible(false)}>
                                <Ionicons name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <AppText variant="title" style={styles.modalSubtitle}>How was your food?</AppText>
                        <View style={styles.starSelectorRow}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                                    <Ionicons
                                        name={star <= reviewRating ? "star" : "star-outline"}
                                        size={40}
                                        color="#FFB800"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Share your experience (optional)"
                            placeholderTextColor={COLORS.textLight}
                            multiline
                            numberOfLines={4}
                            value={reviewComment}
                            onChangeText={setReviewComment}
                        />

                        <AppButton
                            title="Submit Review"
                            onPress={submitReview}
                            style={styles.submitReviewBtn}
                        />
                    </View>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    errorCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderRadius: RADIUS.l,
        alignItems: 'center',
        ...SHADOWS.soft,
    },
    errorText: {
        color: COLORS.text,
        textAlign: 'center',
        marginTop: SPACING.m,
        marginBottom: SPACING.l,
    },
    heroContainer: {
        height: 250,
        width: '100%',
    },
    heroImage: {
        ...StyleSheet.absoluteFillObject,
    },
    headerControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.m,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: COLORS.primary,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        marginTop: -30,
        padding: SPACING.l,
    },
    name: {
        marginBottom: SPACING.xs,
    },
    description: {
        marginBottom: SPACING.m,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    metaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.xl,
    },
    metaText: {
        marginLeft: 6,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.l,
    },
    menuSection: {
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        marginBottom: SPACING.m,
    },
    cartFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.m,
        paddingBottom: 40,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    checkoutBtn: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: RADIUS.m,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.m,
    },
    checkoutCount: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    reviewsSection: {
        marginTop: SPACING.l,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    ratingSummaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingSummaryText: {
        fontWeight: 'bold',
        color: COLORS.text,
    },
    writeReviewBtn: {
        height: 36,
        paddingHorizontal: SPACING.m,
    },
    reviewCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: RADIUS.m,
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
        alignItems: 'center',
    },
    reviewStars: {
        flexDirection: 'row',
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
    modalSubtitle: {
        textAlign: 'center',
        marginBottom: SPACING.m,
    },
    starSelectorRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
        gap: SPACING.s,
    },
    reviewInput: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.m,
        padding: SPACING.m,
        height: 120,
        textAlignVertical: 'top',
        fontSize: 16,
        color: COLORS.text,
        marginBottom: SPACING.xl,
    },
    submitReviewBtn: {
        width: '100%',
    },
});
