import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import screen from "@/utils/screen"
import React, { useState } from "react"
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router"
import { colors } from "@/constants/Colors"

export default function ProfileImageScreen() {
    const [avatar, setAvatar] = useState(assets.image.pick_avatar);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });

        if (result && result.assets && result.assets.length > 0) {
            let base64Img = `data:image/jpeg;base64,${result.assets[0]?.base64}`;

            setAvatar(base64Img);
        }

        if (!result.canceled) {

        }
    };

    const takePicture = async () => {
        // Yêu cầu quyền truy cập camera
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền truy cập camera.");
            return;
        }

        // Mở camera để chụp ảnh
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // Cho phép chỉnh sửa (crop)
            aspect: [1, 1], // Tỷ lệ khung hình
            quality: 1, // Chất lượng ảnh (1 = cao nhất)
            base64: true, // Lấy base64 nếu cần
        });

        if (result && result.assets && result.assets.length > 0) {
            let base64Img = `data:image/jpeg;base64,${result.assets[0]?.base64}`;

            setAvatar(base64Img);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={typeof avatar === 'string' && avatar.includes('data:image/jpeg;base64') ? { uri: avatar } : avatar}
                style={styles.avatar}
            />
            <Text style={styles.loginText}>Chọn ảnh hồ sơ</Text>

            <View style={{ gap: 10, marginBottom: 20, width: '100%' }}>
                <OrbitButton
                    text="Chụp ảnh"
                    onPress={takePicture}
                />
                <OrbitButton
                    text="Chọn ảnh từ thư viện"
                    onPress={pickImage}
                />
            </View>

            <TouchableOpacity onPress={() => router.replace('/(home)')}>
                <Text style={styles.skipText}>Bỏ qua</Text>
            </TouchableOpacity>
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
        marginTop: 15,
        marginBottom: 30
    },

    avatar: {
        width: screen.width / 1.34,
        height: screen.width / 1.34,
        borderRadius: screen.width
    },

    skipText: {
        fontWeight: '600',
        fontSize: 17,
        color: 'rgba(122, 122, 122, 1)'
    }
})