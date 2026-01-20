import React, { createContext, useState, useContext, ReactNode } from 'react';

export type PriorityLevel = 'Low' | 'Mid' | 'High';

export interface Habit {
    id: string;
    name: string;
    category: string;
    priority: PriorityLevel;
    targetDays: number;
    color: string;
    createdAt: Date;
    completedDays: number[]; // Array of indices (0 to targetDays-1) that are completed
}

interface HabitContextType {
    habits: Habit[];
    addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDays'>) => void;
    deleteHabit: (id: string) => void;
    toggleHabitCompletion: (habitId: string, dayIndex: number) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
    const [habits, setHabits] = useState<Habit[]>([]);

    const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDays'>) => {
        const newHabit: Habit = {
            ...habitData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            completedDays: [],
        };
        setHabits((prev) => [newHabit, ...prev]);
    };

    const deleteHabit = (id: string) => {
        setHabits((prev) => prev.filter((habit) => habit.id !== id));
    };

    const toggleHabitCompletion = (habitId: string, dayIndex: number) => {
        setHabits((prev) =>
            prev.map((habit) => {
                if (habit.id !== habitId) return habit;

                const isCompleted = habit.completedDays.includes(dayIndex);
                let newCompletedDays;

                if (isCompleted) {
                    newCompletedDays = habit.completedDays.filter((d) => d !== dayIndex);
                } else {
                    newCompletedDays = [...habit.completedDays, dayIndex];
                }

                return { ...habit, completedDays: newCompletedDays };
            })
        );
    };

    return (
        <HabitContext.Provider value={{ habits, addHabit, deleteHabit, toggleHabitCompletion }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabit = () => {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error('useHabit must be used within a HabitProvider');
    }
    return context;
};
