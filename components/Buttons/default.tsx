import { colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

interface OrbitButtonProps {
    backgroundColor?: string,
    text: string;
    buttonStyle?: ViewStyle;
    color?: string;
    textStyle?: TextStyle;
    loading?: boolean;
    viewStyle?: ViewStyle;
    onPress: () => void | Promise<void>;
}

const OrbitButton: React.FC<OrbitButtonProps> = ({ backgroundColor, text, buttonStyle, color, textStyle, loading, viewStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: loading ? '#EBEBE4' : backgroundColor ?? colors.defaultButton }, buttonStyle]}
            disabled={loading}
            onPress={onPress}
        >
            <View
                style={[{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }, viewStyle]}>
                {loading && <ActivityIndicator color="white" />}
                <Text style={[styles.text, { color: color ?? colors.white }, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrbitButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.buttonBorder
    },

    text: {
        fontWeight: 'semibold',
        fontFamily: 'Inter',
        fontSize: 16
    }
})