import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Counter } from '../components/Counter';
import { CategorySelector } from '../components/CategorySelector';
import { PriorityToggle } from '../components/PriorityToggle';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';

const CATEGORIES = ['Coding', 'Mind', 'Gym', 'Learning', 'Custom'];

import { ColorSelector } from '../components/ColorSelector';
import { useHabit } from '../context/HabitContext';

// ...

export default function CreateHobbyScreen() {
    const router = useRouter();
    const { addHabit } = useHabit();

    // Form State
    const [habitName, setHabitName] = useState('');
    const [targetDays, setTargetDays] = useState(1);
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [priorityLevel, setPriorityLevel] = useState<'Low' | 'Mid' | 'High'>('Low');
    const [color, setColor] = useState('#6366f1'); // Default color (Indigo)
    const [error, setError] = useState('');

    const handleCreate = () => {
        // Validation
        if (habitName.trim().length === 0) {
            setError('Please give your habit a name');
            return;
        }

        // Create habit via Context
        addHabit({
            name: habitName,
            targetDays,
            category,
            priority: priorityLevel,
            color,
        });

        // Navigate to Dashboard
        router.push('/(tabs)/dashboard' as any);
    };

    const getPriorityDescription = (level: string) => {
        if (level === 'High') return "Top of the list. Urgent focus.";
        if (level === 'Mid') return "Balanced priority.";
        return "Casual habit. No pressure.";
    };

    return (
        <ScreenWrapper style={styles.paddingRemoved}>
            <Header title="New Hobby" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* ... existing fields ... */}
                <Text style={styles.sectionTitle}>Details</Text>

                {/* Habit Name */}
                <Input
                    label="Habit Name"
                    placeholder="e.g. Morning Meditation"
                    value={habitName}
                    onChangeText={(t) => {
                        setHabitName(t);
                        if (error) setError('');
                    }}
                    error={error}
                />

                {/* Category Selector */}
                <CategorySelector
                    label="Category"
                    categories={CATEGORIES}
                    selectedCategory={category}
                    onSelect={setCategory}
                />

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Goals & Settings</Text>

                {/* Target Days Counter */}
                <Counter
                    label="Weekly Goal (Days)"
                    value={targetDays}
                    onChange={setTargetDays}
                    min={1}
                    max={7}
                />

                {/* Priority Toggle - 3 Levels */}
                <PriorityToggle
                    label="Priority Level"
                    value={priorityLevel}
                    onValueChange={setPriorityLevel}
                    description={getPriorityDescription(priorityLevel)}
                />

                {/* Color Selector */}
                <ColorSelector
                    label="Habit Color"
                    selectedColor={color}
                    onSelect={setColor}
                />

                {/* ... footer ... */}
                <View style={styles.footer}>
                    <Button
                        title="Create Habit"
                        onPress={handleCreate}
                        variant="primary"
                    />
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    paddingRemoved: {
        paddingHorizontal: 0,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 24,
    },
    footer: {
        marginTop: 32,
    },
});
