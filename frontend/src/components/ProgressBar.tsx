import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface ProgressBarProps {
    progress: number; // 0 to 100
    height?: number;
    backgroundColor?: string;
    fillColor?: string;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    height = 8,
    backgroundColor = Colors.background,
    fillColor = Colors.primary,
    style
}) => {
    return (
        <View style={[styles.container, { height, backgroundColor }, style]}>
            <View
                style={[
                    styles.fill,
                    {
                        width: `${Math.min(Math.max(progress, 0), 100)}%`,
                        backgroundColor: fillColor
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 10,
    },
});
