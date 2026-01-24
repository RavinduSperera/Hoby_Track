import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Standard icons
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

interface HeaderProps {
    title?: string;
    showMenu?: boolean;
    onMenuPress?: () => void;
    onProfilePress?: () => void;
}

/**
 * Custom Header Component
 * Contains Hamburger Menu, App Title, and Profile Placeholder.
 */
export const Header: React.FC<HeaderProps> = ({
    title = "Hoby_Track", // Default App Name
    showMenu = true,
    onMenuPress,
    onProfilePress,
}) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Left: Hamburger Menu */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={onMenuPress}
                activeOpacity={0.7}
            >
                <Feather name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>

            {/* Center: App Name */}
            <Text style={styles.title}>{title}</Text>

            {/* Right: Profile Photo Space */}
            <TouchableOpacity
                style={styles.profileContainer}
                onPress={onProfilePress}
                activeOpacity={0.7}
            >
                {/* Placeholder for Profile Image - using a View for now */}
                <View style={styles.avatarPlaceholder}>
                    <Feather name="user" size={20} color={Colors.textSecondary} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70, // Increased height for airiness
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20, // Slightly more padding
        backgroundColor: Colors.background,
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.surface,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        letterSpacing: 0.5,
    },
    profileContainer: {
        padding: 4,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
