import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Header } from '../components/Header';
import { Colors } from '../constants/Colors';

export default function CreateHobbyScreen() {
    return (
        <ScreenWrapper style={styles.paddingRemoved}>
            <Header title="New Hobby" />
            <View style={styles.container}>
                <Text style={styles.text}>Start a New Journey</Text>
                <Text style={styles.subText}>Form to create a hobby will go here.</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
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
    }
});
