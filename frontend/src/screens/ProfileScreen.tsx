import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';
import { useHabit } from '../context/HabitContext';
import { useUser } from '../context/UserContext';
import { StatCard } from '../components/StatCard';
import { RankSection } from '../components/RankSection';
import { WeeklyOverview } from '../components/WeeklyOverview';

export default function ProfileScreen() {
    const router = useRouter();
    const { habits } = useHabit();
    const { user } = useUser();

    // Calculate Stats
    const stats = useMemo(() => {
        const total = habits.length;
        const completions = habits.reduce((acc, h) => acc + h.completedDays.length, 0);
        const targetCompletions = habits.reduce((acc, h) => acc + h.targetDays, 0);
        const percentage = targetCompletions > 0 ? Math.round((completions / targetCompletions) * 100) : 0;

        const categories: Record<string, number> = {};
        habits.forEach(h => {
            categories[h.category] = (categories[h.category] || 0) + h.completedDays.length;
        });
        const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

        return { total, completions, percentage, topCategory };
    }, [habits]);

    // Rank Logic
    const getRankInfo = (completions: number) => {
        if (completions >= 50) return { title: 'Zen Legend', color: '#8B5CF6', next: 100, icon: 'shield' };
        if (completions >= 30) return { title: 'Discipline Master', color: '#EC4899', next: 50, icon: 'award' };
        if (completions >= 15) return { title: 'Habit Hero', color: '#10B981', next: 30, icon: 'zap' };
        if (completions >= 5) return { title: 'Consistency Keen', color: '#F59E0B', next: 15, icon: 'trending-up' };
        return { title: 'Novice Explorer', color: Colors.primary, next: 5, icon: 'compass' };
    };

    const rank = getRankInfo(stats.completions);

    const handleLogout = () => {
        router.replace('/onboarding' as any);
    };

    return (
        <ScreenWrapper style={styles.paddingRemoved}>
            <Header title="My Profile" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Section: Inline Avatar & Name */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            {user?.avatar ? (
                                <Feather name={user.avatar as any} size={40} color={rank.color} />
                            ) : (
                                <Text style={styles.avatarText}>
                                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                                </Text>
                            )}
                        </View>
                        <View style={styles.rankBadge}>
                            <Feather name={rank.icon as any} size={12} color={Colors.text} />
                        </View>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{user?.name || 'User'}</Text>
                        <Text style={[styles.rankTitle, { color: rank.color }]}>{rank.title}</Text>
                        <Text style={styles.activeStats}>{stats.total} Active Hobbies</Text>
                    </View>
                </View>

                {/* Rank Progress Bar Component */}
                <RankSection
                    currentCompletions={stats.completions}
                    nextRankThreshold={rank.next}
                    rankColor={rank.color}
                />

                {/* Stat Grid */}
                <View style={styles.statGrid}>
                    <StatCard
                        title="Focus"
                        value={stats.topCategory}
                        icon="target"
                        color="#F59E0B"
                    />
                    <StatCard
                        title="Consistency"
                        value={`${stats.percentage}%`}
                        icon="activity"
                        color="#10B981"
                    />
                    <StatCard
                        title="Sessions"
                        value={stats.completions.toString()}
                        icon="check-circle"
                        color="#6366F1"
                    />
                    <StatCard
                        title="Streak"
                        value="3 Days"
                        icon="zap"
                        color="#EF4444"
                    />
                </View>

                {/* Progress Visualizer: Weekly Overview Component */}
                <WeeklyOverview habits={habits} />

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        title="Log Out"
                        onPress={handleLogout}
                        variant="ghost"
                        icon={<Feather name="log-out" size={20} color={Colors.error} style={{ marginRight: 8 }} />}
                        style={styles.logoutButton}
                        textStyle={styles.logoutText}
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
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    rankBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.background,
    },
    avatarText: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    headerInfo: {
        marginLeft: 20,
        flex: 1,
    },
    name: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    rankTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 4,
    },
    activeStats: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    statGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    actions: {
        marginTop: 8,
    },
    logoutButton: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    logoutText: {
        color: Colors.error,
    }
});
