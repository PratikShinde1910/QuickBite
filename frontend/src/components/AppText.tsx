import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../theme';

interface AppTextProps extends TextProps {
    variant?: keyof typeof TYPOGRAPHY;
    color?: string;
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const AppText: React.FC<AppTextProps> = ({
    variant = 'body',
    color,
    align = 'left',
    style,
    children,
    ...props
}) => {
    const typographyStyle = TYPOGRAPHY[variant];
    return (
        <Text
            style={[
                typographyStyle,
                color && { color },
                { textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
