import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FF5722', // Modern deep orange for a food app
  primaryLight: '#FF8A65',
  secondary: '#2E3E5C', // Deep night blue for text
  background: '#F8F9FA', // Off-white for clean look
  surface: '#FFFFFF', // Pure white for cards
  text: '#1F2937', // Dark gray for main text
  textLight: '#6B7280', // Medium gray for secondary text
  border: '#E5E7EB', // Subtle borders
  success: '#10B981', // Green for order success
  error: '#EF4444',
  transparent: 'transparent',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const RADIUS = {
  s: 8,
  m: 16, // Requested requirement
  l: 20, // Requested requirement
  xl: 30,
  round: 100, // For circular elements like avatars/buttons
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: COLORS.text },
  h2: { fontSize: 24, fontWeight: '700' as const, color: COLORS.text },
  h3: { fontSize: 20, fontWeight: '600' as const, color: COLORS.text },
  title: { fontSize: 18, fontWeight: '600' as const, color: COLORS.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: COLORS.text },
  caption: { fontSize: 14, fontWeight: '400' as const, color: COLORS.textLight },
  small: { fontSize: 12, fontWeight: '500' as const, color: COLORS.textLight },
};

export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const SIZES = {
  width,
  height,
};
