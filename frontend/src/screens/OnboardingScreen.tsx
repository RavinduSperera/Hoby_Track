import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';

export default function OnboardingScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/register' as any);
    };

    return (
        <ScreenWrapper style={styles.container}>
            {/* Hide Header for Onboarding */}
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                {/* Placeholder for an Image or Icon */}
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>H</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    Master Your <Text style={styles.highlight}>Hobbies</Text>
                </Text>
                <Text style={styles.description}>
                    Track your progress, stay consistent, and achieve your goals with Hoby_Track.
                    The ultimate companion for your personal growth.
                </Text>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Get Started"
                    onPress={handleGetStarted}
                    variant="primary"
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    iconText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    content: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 44,
    },
    highlight: {
        color: Colors.primary,
    },
    description: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 16,
        lineHeight: 24,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
