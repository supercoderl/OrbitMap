import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OTPInput = ({ length = 6 }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const inputsRef = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Chuyển sang ô tiếp theo nếu có nhập
        if (text && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((_, index) => (
                <TextInput
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el!)}
                    style={[
                        styles.input,
                        index === focusedIndex ? styles.filled : null, // Đổi màu khi focus
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={otp[index]}
                    onFocus={() => setFocusedIndex(index)} // Khi focus, cập nhật index
                    onBlur={() => setFocusedIndex(null)}   // Khi mất focus, reset
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    input: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: "rgba(216, 218, 220, 1)",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 32,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    filled: {
        borderColor: "rgba(0, 0, 0, 1)", // Màu xanh khi có giá trị
    },
});

export default OTPInput;