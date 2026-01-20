import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { Colors } from '../constants/Colors';

interface ToggleProps {
    label?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    label,
    value,
    onValueChange,
    description,
}) => {
    // Animation value for the thumb position
    const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false, // Layout properties usually don't support native driver
        }).start();
    }, [value]);

    const toggleSwitch = () => {
        onValueChange(!value);
    };

    // Interpolate color from off (slate) to on (primary)
    const backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.surface, Colors.primary]
    });

    // Interpolate thumb position
    const thumbTranslateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 22] // Start at 2px, end at 22px (container width 50 - thumb width 26 - padding 2)
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {label && <Text style={styles.label}>{label}</Text>}
                <Text style={styles.description}>{description}</Text>
            </View>

            <TouchableWithoutFeedback onPress={toggleSwitch}>
                <Animated.View style={[styles.switchContainer, { backgroundColor }]}>
                    <Animated.View
                        style={[
                            styles.thumb,
                            { transform: [{ translateX: thumbTranslateX }] }
                        ]}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        paddingVertical: 8,
    },
    textContainer: {
        flex: 1,
        paddingRight: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    switchContainer: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent', // Can add border if needed
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 2,
    },
});
