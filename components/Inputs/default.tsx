import { colors } from "@/constants/Colors";
import React from "react"
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle, Text } from "react-native"

interface OrbitInputProps extends TextInputProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    viewStyle?: ViewStyle;
    label: string;
}

const OrbitInput: React.FC<OrbitInputProps> = ({ leftIcon, rightIcon, viewStyle, label, ...props }) => {
    return (
        <View style={{ width: '100%', gap: 4 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.container, viewStyle]}>
                {leftIcon && leftIcon}
                <TextInput style={styles.input} placeholderTextColor={colors.placeholder} {...props} />
                {rightIcon && rightIcon}
            </View>
        </View>
    )
}

export default OrbitInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.defaultBorder,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
    label: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 14,
    }
})