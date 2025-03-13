import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import screen from "@/utils/screen"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native"

export default function PhoneBookScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Tìm tất cả bạn bè</Text>
            <Text style={styles.text}>Cho phép truy cập đầy đủ để Orbit cung cấp đề xuất phù hợp, hoặc chọn “Chọn liên hệ” để thêm bạn theo lựa chọn cá nhân.</Text>

            <ImageBackground source={assets.image.phone_background} style={{ width: 239, height: 482, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={assets.image.phone} style={styles.image} />
            </ImageBackground>

            <OrbitButton
                text="Tiếp tục"
                onPress={() => router.push('/(auth)/friend')}
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
        color: 'black',
        marginBottom: 5,
    },

    text: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
        maxWidth: '75%',
        lineHeight: 20
    },

    image: {
        width: '80%',
        height: '100%',
        objectFit: 'contain'
    }
})