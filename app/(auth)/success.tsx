import OrbitButton from "@/components/Buttons/default"
import { colors } from "@/constants/Colors"
import screen from "@/utils/screen"
import { router } from "expo-router"
import LottieView from "lottie-react-native"
import React from "react"
import { StyleSheet, View, Text } from "react-native"

export default function SuccessScreen() {
    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                loop
                style={{
                    width: screen.width / 2,
                    height: screen.width / 2,
                    marginBottom: 24
                }}
                source={require('../../assets/animations/success.json')}
            />
            <Text style={styles.loginText}>Đã thay đổi mật khẩu</Text>
            <Text style={styles.text}>Mật khẩu của bạn đã được thay đổi thành công!</Text>

            <OrbitButton
                text="Quay lại trang đăng nhập"
                onPress={() => router.push('/(auth)/login')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginText: {
        fontFamily: 'LexendBold',
        fontSize: 30,
        color: colors.primary,
        marginBottom: 5,
    },

    text: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: 50,
        textAlign: 'center',
        maxWidth: '70%',
        lineHeight: 20
    }
})