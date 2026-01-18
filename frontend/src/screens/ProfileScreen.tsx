import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        // Reset navigation to onboarding
        router.replace('/onboarding' as any);
    };

    return (
        <ScreenWrapper style={styles.paddingRemoved}>
            <Header title="My Profile" />
            <View style={styles.container}>
                <View style={styles.avatarLarge}>
                    <Text style={styles.avatarText}>RD</Text>
                </View>
                <Text style={styles.name}>Ravindu Perera</Text>
                <Text style={styles.stats}>5 Active Hobbies</Text>

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
    },
    actions: {
        marginTop: 'auto', // Push to bottom
        width: '100%',
        paddingHorizontal: 24,
        marginBottom: 30,
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
