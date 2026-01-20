import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface CounterProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export const Counter: React.FC<CounterProps> = ({
    label,
    value,
    onChange,
    min = 1,
    max = 100,
}) => {
    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={handleDecrement}
                    style={[styles.button, value <= min && styles.buttonDisabled]}
                    disabled={value <= min}
                >
                    <Feather name="minus" size={20} color={value <= min ? Colors.textSecondary : Colors.text} />
                </TouchableOpacity>

                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                </View>

                <TouchableOpacity
                    onPress={handleIncrement}
                    style={[styles.button, value >= max && styles.buttonDisabled]}
                    disabled={value >= max}
                >
                    <Feather name="plus" size={20} color={value >= max ? Colors.textSecondary : Colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    label: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 12,
        fontWeight: '500',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 6,
        borderWidth: 1,
        borderColor: Colors.border, // Subtle border
    },
    button: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: Colors.background, // Slightly darker button bg
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    valueContainer: {
        flex: 1,
        alignItems: 'center',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
});
