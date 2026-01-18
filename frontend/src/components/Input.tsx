import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface InputProps extends TextInputProps {
    label: string;
    containerStyle?: ViewStyle;
    error?: string;
}

/**
 * Reusable Input Component
 * Features a modern design with focus states and error handling.
 */
export const Input: React.FC<InputProps> = ({
    label,
    containerStyle,
    error,
    style,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {label}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error ? styles.inputError : null,
                    style,
                ]}
                placeholderTextColor={Colors.textSecondary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 8,
        fontWeight: '500',
    },
    labelFocused: {
        color: Colors.primary,
    },
    input: {
        height: 56,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.text,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    inputFocused: {
        borderColor: Colors.primary,
        backgroundColor: Colors.background, // Optional: clearer background on focus
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});
