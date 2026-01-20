import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const CATEGORY_MAP: Record<string, keyof typeof Feather.glyphMap> = {
    'Coding': 'code',
    'Mind': 'smile',
    'Gym': 'activity',
    'Learning': 'book',
    'Custom': 'star',
};

interface CategorySelectorProps {
    label: string;
    selectedCategory: string;
    onSelect: (category: string) => void;
    categories: string[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
    label,
    selectedCategory,
    onSelect,
    categories,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    const iconName = CATEGORY_MAP[category] || 'circle';

                    return (
                        <TouchableOpacity
                            key={category}
                            onPress={() => onSelect(category)}
                            activeOpacity={0.7}
                            style={[
                                styles.card,
                                isSelected && styles.cardSelected,
                            ]}
                        >
                            <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
                                <Feather name={iconName} size={24} color={isSelected ? Colors.text : Colors.textSecondary} />
                            </View>
                            <Text style={[styles.cardText, isSelected && styles.cardTextSelected]}>
                                {category}
                            </Text>
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
    card: {
        width: 100,
        height: 100, // Square box type
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    cardSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    iconContainer: {
        marginBottom: 8,
        opacity: 0.8,
    },
    iconContainerSelected: {
        opacity: 1,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
    },
    cardTextSelected: {
        color: '#FFFFFF',
    },
});
