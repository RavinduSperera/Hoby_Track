import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Colors } from '../constants/Colors';
import { Habit, useHabit } from '../context/HabitContext';
import { HabitCard } from '../components/HabitCard';
import { CustomAlert } from '../components/CustomAlert';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';

const CATEGORIES = ['All', 'Coding', 'Mind', 'Gym', 'Learning', 'Custom'];

export default function DashboardScreen() {
    const { habits, toggleHabitCompletion, deleteHabit } = useHabit();

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // UI State for Alerts
    const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Derived State: Filtered Habits
    const filteredHabits = useMemo(() => {
        return habits.filter(habit => {
            const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || habit.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [habits, searchQuery, activeCategory]);

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

            {/* Sticky Search & Filter Section */}
            <View style={styles.fixedHeader}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <FilterTabs
                    tabs={CATEGORIES}
                    activeTab={activeCategory}
                    onTabChange={setActiveCategory}
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {habits.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.text}>Welcome to your Dashboard</Text>
                        <Text style={styles.subText}>Your active hobbies will appear here.</Text>
                        <Text style={styles.hintText}>Go to the "Create" tab to start!</Text>
                    </View>
                ) : (
                    <View style={styles.habitsList}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                {activeCategory === 'All' ? 'Your Habits' : `${activeCategory} Habits`}
                            </Text>
                            <Text style={styles.countText}>{filteredHabits.length} total</Text>
                        </View>

                        {filteredHabits.length === 0 ? (
                            <View style={styles.noResults}>
                                <Text style={styles.noResultsText}>No habits found matching your criteria.</Text>
                            </View>
                        ) : (
                            filteredHabits.map((habit) => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    onToggleDay={(dayIndex) => toggleHabitCompletion(habit.id, dayIndex)}
                                    onDeleteRequest={handleDeleteRequest}
                                />
                            ))
                        )}
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
    fixedHeader: {
        paddingHorizontal: 24,
        paddingTop: 8,
        backgroundColor: Colors.background,
        zIndex: 10,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 8, // Reduced since fixedHeader has padding
        paddingBottom: 40,
        flexGrow: 0,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 60,
        width: '100%',
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
        marginTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    countText: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    noResults: {
        paddingVertical: 80,
        alignItems: 'center',
        width: '100%',
    },
    noResultsText: {
        color: Colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
    }
});
