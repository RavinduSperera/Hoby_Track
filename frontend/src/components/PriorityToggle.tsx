import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../constants/Colors';

type PriorityLevel = 'Low' | 'Mid' | 'High';

interface PriorityToggleProps {
    label: string;
    value: PriorityLevel;
    onValueChange: (value: PriorityLevel) => void;
    description?: string;
}

export const PriorityToggle: React.FC<PriorityToggleProps> = ({
    label,
    value,
    onValueChange,
    description,
}) => {
    // Animation for the thumb position
    const animation = useRef(new Animated.Value(value === 'Low' ? 0 : value === 'Mid' ? 1 : 2)).current;

    // Sync animation when external value changes
    useEffect(() => {
        let toValue = 0;
        if (value === 'Mid') toValue = 1;
        if (value === 'High') toValue = 2;

        Animated.spring(animation, {
            toValue,
            useNativeDriver: false,
            friction: 8,
            tension: 50,
        }).start();
    }, [value]);

    const handlePress = () => {
        if (value === 'Low') onValueChange('Mid');
        else if (value === 'Mid') onValueChange('High');
        else onValueChange('Low');
    };

    const backgroundColor = animation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [Colors.success, '#F59E0B', Colors.error] // Green, Orange, Red
    });

    // Use percentages for responsive full-width sliding
    const thumbLeft = animation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['1%', '34%', '67%']
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.track}>
                <Animated.View
                    style={[
                        styles.thumb,
                        {
                            left: thumbLeft,
                            backgroundColor: backgroundColor,
                        }
                    ]}
                />
                <View style={styles.trackLabels}>
                    <TouchableOpacity
                        style={styles.labelTouch}
                        onPress={() => onValueChange('Low')}
                        activeOpacity={1}
                    >
                        <Text style={styles.trackLabelTxt}>Low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.labelTouch}
                        onPress={() => onValueChange('Mid')}
                        activeOpacity={1}
                    >
                        <Text style={styles.trackLabelTxt}>Mid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.labelTouch}
                        onPress={() => onValueChange('High')}
                        activeOpacity={1}
                    >
                        <Text style={styles.trackLabelTxt}>High</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        width: '100%',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    description: {
        fontSize: 12,
        color: Colors.textSecondary,
        maxWidth: '60%',
        textAlign: 'right',
    },
    track: {
        width: '100%',
        height: 56, // Matching Create Button height
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden', // Contain the thumb
    },
    thumb: {
        width: '32%', // Roughly 1/3 minus margins
        height: 48,
        borderRadius: 12,
        position: 'absolute',
        // left is handled by animation
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    trackLabels: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'space-between',
    },
    labelTouch: {
        width: '33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trackLabelTxt: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: '600',
        textAlign: 'center',
    }
});
