import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Colors } from '../constants/Colors';

export default function ProfileScreen() {
    return (
        <ScreenWrapper style={styles.paddingRemoved}>
            <Header title="My Profile" />
            <View style={styles.container}>
                <View style={styles.avatarLarge}>
                    <Text style={styles.avatarText}>RD</Text>
                </View>
                <Text style={styles.name}>Ravindu Perera</Text>
                <Text style={styles.stats}>5 Active Hobbies</Text>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    paddingRemoved: {
        paddingHorizontal: 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 48,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    avatarText: {
        fontSize: 32,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    name: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    stats: {
        color: Colors.textSecondary,
        fontSize: 16,
    }
});
