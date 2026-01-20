import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Habit } from '../context/HabitContext';

// Map categories to icons
const CATEGORY_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
    'Coding': 'code',
    'Mind': 'smile',
    'Gym': 'activity',
    'Learning': 'book',
    'Custom': 'star',
};

interface HabitCardProps {
    habit: Habit;
    onToggleDay: (dayIndex: number) => void;
    onDeleteRequest: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleDay, onDeleteRequest }) => {
    const iconName = CATEGORY_ICONS[habit.category] || 'sun';
    const completedCount = habit.completedDays.length;
    const progressPercent = Math.round((completedCount / habit.targetDays) * 100);

    // Animation refs for the card itself (optional if we want smooth removal from list)
    // For now, let's focus on the alert flow correctly.

    return (
        <View style={styles.container}>
            {/* Header: Icon, Name, Category */}
            <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: habit.color + '20' }]}>
                    <Feather name={iconName} size={20} color={habit.color} />
                </View>
                <View style={styles.headerTexts}>
                    <Text style={styles.name}>{habit.name}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.category}>{habit.category}</Text>
                        <View style={styles.dot} />
                        <Text style={[styles.priority, { color: getPriorityColor(habit.priority) }]}>
                            {habit.priority}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => onDeleteRequest(habit)}
                    style={styles.deleteButton}
                    activeOpacity={0.6}
                >
                    <Feather name="trash-2" size={20} color={Colors.error} />
                </TouchableOpacity>
            </View>

            {/* GitHub-style Grid Boxes */}
            <View style={styles.gridContainer}>
                {Array.from({ length: habit.targetDays }).map((_, index) => {
                    const isCompleted = habit.completedDays.includes(index);
                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            onPress={() => onToggleDay(index)}
                            style={[
                                styles.gridBox,
                                isCompleted && { backgroundColor: habit.color },
                                !isCompleted && styles.gridBoxEmpty
                            ]}
                        />
                    );
                })}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {completedCount}/{habit.targetDays} sessions this week
                </Text>
                <Text style={styles.percentText}>{progressPercent}%</Text>
            </View>
        </View>
    );
};

const getPriorityColor = (p: string) => {
    if (p === 'High') return Colors.error;
    if (p === 'Mid') return '#F59E0B';
    return Colors.success;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTexts: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 2,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    category: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: Colors.textSecondary,
        marginHorizontal: 6,
    },
    priority: {
        fontSize: 12,
        fontWeight: '600',
    },
    deleteButton: {
        padding: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    gridBox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: Colors.background,
    },
    gridBoxEmpty: {
        backgroundColor: Colors.background,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    percentText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textSecondary,
    }
});
