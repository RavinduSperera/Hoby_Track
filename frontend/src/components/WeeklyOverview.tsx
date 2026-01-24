import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Habit } from '../context/HabitContext';
import { ProgressBar } from './ProgressBar';

interface WeeklyOverviewProps {
    habits: Habit[];
}

export const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ habits }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Overview</Text>
            <View style={styles.container}>
                {habits.length === 0 ? (
                    <Text style={styles.emptyText}>Add hobbies to see your progress chart</Text>
                ) : (
                    habits.map((habit) => (
                        <View key={habit.id} style={styles.row}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label} numberOfLines={1}>{habit.name}</Text>
                            </View>
                            <View style={styles.barWrapper}>
                                <ProgressBar
                                    progress={(habit.completedDays.length / habit.targetDays) * 100}
                                    fillColor={habit.color}
                                    height={12}
                                    style={styles.bar}
                                />
                                <Text style={styles.value}>
                                    {habit.completedDays.length}/{habit.targetDays}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    container: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    emptyText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingVertical: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    labelContainer: {
        width: 80,
    },
    label: {
        color: Colors.textSecondary,
        fontSize: 12,
        fontWeight: '500',
    },
    barWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    bar: {
        flex: 1,
        marginRight: 10,
    },
    value: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: 'bold',
        width: 35,
        textAlign: 'right',
    },
});
