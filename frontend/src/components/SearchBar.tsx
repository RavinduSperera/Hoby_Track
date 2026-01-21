import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = "Search habits..." }) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Feather name="search" size={20} color={Colors.textSecondary} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textSecondary}
                    value={value}
                    onChangeText={onChangeText}
                    autoCorrect={false}
                />
                {value.length > 0 && (
                    <TouchableOpacity onPress={() => onChangeText('')} activeOpacity={0.6}>
                        <Feather name="x-circle" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 16,
        height: 24,
        padding: 0,
    },
});
