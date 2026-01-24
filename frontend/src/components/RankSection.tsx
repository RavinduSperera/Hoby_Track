import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { ProgressBar } from './ProgressBar';

interface RankSectionProps {
    currentCompletions: number;
    nextRankThreshold: number;
    rankColor: string;
}

export const RankSection: React.FC<RankSectionProps> = ({
    currentCompletions,
    nextRankThreshold,
    rankColor
}) => {
    const progress = (currentCompletions / nextRankThreshold) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.textRow}>
                <Text style={styles.label}>Rank Progress</Text>
                <Text style={styles.value}>{currentCompletions}/{nextRankThreshold}</Text>
            </View>
            <ProgressBar
                progress={progress}
                fillColor={rankColor}
                height={10}
            />
            <Text style={styles.hint}>
                Complete {nextRankThreshold - currentCompletions} more sessions to rank up!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    value: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    hint: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 12,
        textAlign: 'center',
    },
});
