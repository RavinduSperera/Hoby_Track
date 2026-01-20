import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Colors } from '../constants/Colors';
import { Habit, useHabit } from '../context/HabitContext';
import { HabitCard } from '../components/HabitCard';
import { CustomAlert } from '../components/CustomAlert';

export default function DashboardScreen() {
    const { habits, toggleHabitCompletion, deleteHabit } = useHabit();

    // UI State for Alerts
    const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleDeleteRequest = (habit: Habit) => {
        setHabitToDelete(habit);
    };

    const confirmDelete = () => {
        if (habitToDelete) {
            deleteHabit(habitToDelete.id);
            setHabitToDelete(null);
            // Show success after a small delay for a smooth transition
            setTimeout(() => {
                setShowSuccess(true);
            }, 400);
        }
    };

    return (
        <ScreenWrapper style={styles.paddingRemoved}>
            <Header title="Dashboard" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {habits.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.text}>Welcome to your Dashboard</Text>
                        <Text style={styles.subText}>Your active hobbies will appear here.</Text>
                        <Text style={styles.hintText}>Go to the "Create" tab to start!</Text>
                    </View>
                ) : (
                    <View style={styles.habitsList}>
                        <Text style={styles.sectionTitle}>Your Habits</Text>
                        {habits.map((habit) => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onToggleDay={(dayIndex) => toggleHabitCompletion(habit.id, dayIndex)}
                                onDeleteRequest={handleDeleteRequest}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Delete Confirmation Alert */}
            <CustomAlert
                visible={habitToDelete !== null}
                type="danger"
                title="Remove Habit"
                message={`Are you sure you want to delete "${habitToDelete?.name}"? This action cannot be undone.`}
                confirmLabel="Delete"
                onConfirm={confirmDelete}
                onClose={() => setHabitToDelete(null)}
            />

            {/* Success Alert */}
            <CustomAlert
                visible={showSuccess}
                type="success"
                title="Deleted!"
                message="The habit has been removed from your dashboard."
                confirmLabel="Got it"
                onClose={() => setShowSuccess(false)}
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    paddingRemoved: {
        paddingHorizontal: 0,
    },
    scrollContent: {
        padding: 24,
        flexGrow: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100, // Visual centering roughly
    },
    text: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    subText: {
        color: Colors.textSecondary,
        fontSize: 16,
        marginBottom: 8,
    },
    hintText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    habitsList: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    }
});
