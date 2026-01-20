import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

const COLORS = [
    '#6366f1', // Indigo (Primary)
    '#10b981', // Emerald
    '#ec4899', // Pink
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#14b8a6', // Teal
];

interface ColorSelectorProps {
    label: string;
    selectedColor: string;
    onSelect: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
    label,
    selectedColor,
    onSelect,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {COLORS.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                        <TouchableOpacity
                            key={color}
                            onPress={() => onSelect(color)}
                            activeOpacity={0.8}
                            style={[
                                styles.circle,
                                { backgroundColor: color },
                                isSelected && styles.selectedCircle,
                            ]}
                        >
                            {isSelected && <View style={styles.innerDot} />}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
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
    scrollContent: {
        paddingRight: 16,
        gap: 12,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCircle: {
        borderWidth: 3,
        borderColor: Colors.background, // Create a gap effect
        // We need an outer ring. 
        // Actually simplicity: 
        // Just transform scale? Or add a border of white?
        // Let's use a shadow or ring.
        // simpler: White border (background color) + shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        transform: [{ scale: 1.1 }]
    },
    innerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
    }
});
