import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Colors } from '../constants/Colors';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (name.trim().length === 0) {
            setError('Please enter your name');
            return;
        }
        // TODO: Save user name to storage
        console.log('User Registered:', name);
        // Navigate to Home or next screen
        router.replace('/(tabs)/dashboard' as any);
    };

    return (
        <ScreenWrapper style={styles.background}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.background },
                    headerTintColor: Colors.text,
                    headerShadowVisible: false,
                    headerTitle: '', // Empty title to keep it clean
                    headerBackTitle: '',
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <View style={styles.contentContainer}>
                            <View style={styles.header}>
                                <Text style={styles.title}>What's your name?</Text>
                                <Text style={styles.subtitle}>
                                    We'd love to know who we're helping today.
                                </Text>
                            </View>

                            <View style={styles.form}>
                                <Input
                                    label="Your Name"
                                    placeholder="Ex. John Doe"
                                    value={name}
                                    onChangeText={(text) => {
                                        setName(text);
                                        if (error) setError('');
                                    }}
                                    error={error}
                                    autoFocus
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Button
                                title="Continue"
                                onPress={handleRegister}
                                variant="primary"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    background: {
        paddingHorizontal: 0, // Reset padding from wrapper
    },
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    contentContainer: {
        flex: 1,
        // Pushes the footer to the bottom
    },
    header: {
        marginTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
    form: {
        marginTop: 40,
    },
    footer: {
        marginBottom: 20,
    },
});
