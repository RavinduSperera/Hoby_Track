import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Button } from './Button';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    type: 'danger' | 'success' | 'info';
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onClose: () => void;
}

const { height } = Dimensions.get('window');

export const CustomAlert: React.FC<CustomAlertProps> = ({
    visible,
    title,
    message,
    type,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onClose,
}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: height,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowModal(false);
            });
        }
    }, [visible]);

    const getIcon = (): keyof typeof Feather.glyphMap => {
        switch (type) {
            case 'danger': return 'trash-2';
            case 'success': return 'check-circle';
            case 'info': return 'info';
            default: return 'help-circle';
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'danger': return Colors.error;
            case 'success': return Colors.success;
            case 'info': return Colors.primary;
            default: return Colors.text;
        }
    };

    if (!showModal) return null;

    return (
        <Modal transparent visible={showModal} animationType="none" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.flex} activeOpacity={1} onPress={onClose} />
                </Animated.View>

                <Animated.View style={[
                    styles.content,
                    { transform: [{ translateY: slideAnim }] }
                ]}>
                    <View style={[styles.iconContainer, { backgroundColor: getIconColor() + '15' }]}>
                        <Feather name={getIcon()} size={32} color={getIconColor()} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.footer}>
                        {onConfirm && (
                            <Button
                                title={cancelLabel}
                                variant="outline"
                                onPress={onClose}
                                style={[styles.button, { borderColor: Colors.border, marginRight: 12 }]}
                                textStyle={{ color: Colors.textSecondary }}
                            />
                        )}
                        <Button
                            title={onConfirm ? confirmLabel : 'Close'}
                            variant="primary"
                            onPress={onConfirm || onClose}
                            style={[
                                styles.button,
                                onConfirm && type === 'danger' ? { backgroundColor: Colors.error } : {}
                            ]}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    flex: {
        flex: 1,
    },
    content: {
        width: '100%',
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
    },
    button: {
        flex: 1,
        height: 48,
    },
});
