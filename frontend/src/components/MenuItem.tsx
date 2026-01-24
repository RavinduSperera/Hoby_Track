import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface MenuItemProps {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    onPress: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Feather name={icon} size={20} color={Colors.textSecondary} />
        <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border + '40',
    },
    menuLabel: {
        marginLeft: 16,
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
});
