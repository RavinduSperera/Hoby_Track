import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useSidebar } from '../context/SidebarContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuItem } from './MenuItem';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

export const Sidebar = () => {
    const { isOpen, closeSidebar } = useSidebar();
    const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -SIDEBAR_WIDTH,
                    duration: 250,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsVisible(false);
            });
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents={isOpen ? 'auto' : 'none'}>
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={closeSidebar}>
                <Animated.View
                    style={[
                        styles.backdrop,
                        { opacity: opacityAnim }
                    ]}
                />
            </TouchableWithoutFeedback>

            {/* Sidebar Content */}
            <Animated.View
                style={[
                    styles.sidebar,
                    { transform: [{ translateX: slideAnim }] }
                ]}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.brand}>Hoby_Track</Text>
                        <TouchableOpacity onPress={closeSidebar}>
                            <Feather name="x" size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuItems}>
                        <MenuItem icon="home" label="Dashboard" onPress={closeSidebar} />
                        <MenuItem icon="plus-circle" label="Create New" onPress={closeSidebar} />
                        <MenuItem icon="settings" label="Settings" onPress={closeSidebar} />
                        <MenuItem icon="help-circle" label="Help & FAQ" onPress={closeSidebar} />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.version}>v 1.0.0 (Beta)</Text>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        height: '100%',
        backgroundColor: Colors.surface,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    brand: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
        letterSpacing: 1,
    },
    menuItems: {
        flex: 1,
    },
    footer: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        alignItems: 'center',
    },
    version: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '500',
    }
});
