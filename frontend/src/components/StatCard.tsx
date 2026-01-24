import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface StatCardProps {
    title: string;
    value: string;
    icon: keyof typeof Feather.glyphMap;
    color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: color + '20' }]}>
                <Feather name={icon as any} size={20} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    statCard: {
        width: (width - 48 - 16) / 2,
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    statTitle: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
});
