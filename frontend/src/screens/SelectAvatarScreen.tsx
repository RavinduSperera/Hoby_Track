import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

const AVATARS = [
    { id: '1', icon: 'zap', color: '#6366F1' },
    { id: '2', icon: 'heart', color: '#EF4444' },
    { id: '3', icon: 'star', color: '#F59E0B' },
    { id: '4', icon: 'smile', color: '#10B981' },
    { id: '5', icon: 'cpu', color: '#8B5CF6' },
    { id: '6', icon: 'coffee', color: '#EC4899' },
    { id: '7', icon: 'moon', color: '#06B6D4' },
    { id: '8', icon: 'sun', color: '#F97316' },
];

export default function SelectAvatarScreen() {
    const router = useRouter();
    const { user, updateAvatar } = useUser();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleContinue = () => {
        if (selectedId) {
            const avatar = AVATARS.find(a => a.id === selectedId);
            if (avatar) {
                updateAvatar(avatar.icon);
                console.log('✨ Avatar Selected:', avatar.icon);
            }
        }
        console.log('🏁 Setup Complete. Redirecting to Dashboard...');
        router.replace('/(tabs)/dashboard' as any);
    };

    const handleSkip = () => {
        console.log('⏭️ Avatar setup skipped by user.');
        router.replace('/(tabs)/dashboard' as any);
    };

    return (
        <ScreenWrapper>
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome, {user?.name}!</Text>
                    <Text style={styles.subtitle}>Choose an avatar that fits your vibe.</Text>
                </View>

                <FlatList
                    data={AVATARS}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.grid}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({ item }) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setSelectedId(item.id)}
                                style={[
                                    styles.avatarCircle,
                                    { backgroundColor: item.color + '15', borderColor: isSelected ? item.color : 'transparent' }
                                ]}
                            >
                                <Feather name={item.icon as any} size={32} color={isSelected ? item.color : Colors.textSecondary} />
                                {isSelected && (
                                    <View style={[styles.checkBadge, { backgroundColor: item.color }]}>
                                        <Feather name="check" size={12} color={Colors.text} />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />

                <View style={styles.footer}>
                    <Button
                        title="Complete Setup"
                        onPress={handleContinue}
                        disabled={!selectedId}
                        style={styles.mainButton}
                    />
                    <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                        <Text style={styles.skipText}>I'll do this later</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginTop: 12,
        textAlign: 'center',
    },
    grid: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    avatarCircle: {
        width: (width - 48 - 40) / 3, // Safe calculation for 3 columns with padding
        height: (width - 48 - 40) / 3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        position: 'relative',
    },
    checkBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.background,
    },
    footer: {
        paddingBottom: 30,
        alignItems: 'center',
    },
    mainButton: {
        width: '100%',
    },
    skipButton: {
        marginTop: 20,
        padding: 10,
    },
    skipText: {
        color: Colors.textSecondary,
        fontSize: 15,
        fontWeight: '500',
    },
});
