import assets from "@/assets"
import { colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"

interface BackButtonProps {
    buttonStyle?: ViewStyle;
    onPress: () => void | Promise<void>;
}

const BackButton: React.FC<BackButtonProps> = ({ buttonStyle, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Image source={assets.image.chevron_left} style={styles.icon} />
        </TouchableOpacity>
    )
}

export default BackButton;

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: colors.defaultBorder,
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingBlock: 12,
        borderRadius: 10
    },

    icon: {
        width: 9,
        height: 15
    }
})