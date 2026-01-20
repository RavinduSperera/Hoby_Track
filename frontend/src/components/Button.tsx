import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, StyleProp } from 'react-native';
import { Colors } from '../constants/Colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost'; // Added ghost for text-only buttons
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode; // Optional icon
}

/**
 * Reusable Button Component
 * Supports Primary, Outline, and Ghost variants.
 */
export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    disabled = false,
    loading = false,
    icon,
}) => {
    const getBackgroundColor = () => {
        if (disabled) return Colors.surface;
        if (variant === 'primary') return Colors.primary;
        return 'transparent';
    };

    const getBorderColor = () => {
        if (variant === 'outline') return Colors.primary;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return Colors.textSecondary;
        if (variant === 'primary') return Colors.text;
        if (variant === 'outline') return Colors.primary;
        return Colors.textSecondary;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'outline' ? 1 : 0,
                },
                variant === 'ghost' && {
                    shadowOpacity: 0,
                    elevation: 0,
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon && icon}
                    <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: 16, // Modern rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
        width: '100%',
        // Shadow for depth
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
