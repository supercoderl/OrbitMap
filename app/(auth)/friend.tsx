import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import screen from "@/utils/screen"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native"

const FRIENDS_DATA = [
    { name: 'Khang', avatar: assets.avatar.khang },
    { name: 'Thảo Vy', avatar: assets.avatar.thaovy },
    { name: 'Anh Khoa', avatar: assets.avatar.anhkhoa },
    { name: 'Tố Vy', avatar: assets.avatar.tovy },
    { name: 'Hùng', avatar: assets.avatar.hung },
    { name: 'Mai Thy', avatar: assets.avatar.maithy },
    { name: 'Huy Hoàng', avatar: assets.avatar.huyhoang },
    { name: 'Tường Vy', avatar: assets.avatar.tuongvy },
    { name: 'Minh Huy', avatar: assets.avatar.minhhuy },
    { name: 'Thanh Thư', avatar: assets.avatar.thanhthu },
    { name: 'Thảo Uyên', avatar: assets.avatar.thanhuyen },
    { name: 'Phương Anh', avatar: assets.avatar.phuonganh },
    { name: 'Tùng', avatar: assets.avatar.tung },
]

export default function FriendScreen() {
    return (
        <View style={styles.container}>
            <View style={[styles.row, { marginTop: screen.width / 5 }]}>
                <Text style={styles.loginText}>Thêm bạn bè</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/profile-image')}>
                    <Text style={styles.skipText}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={FRIENDS_DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.row, { justifyContent: 'flex-start', gap: 10 }]}>
                        <Image source={item.avatar} style={styles.avatar} />
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 10, backgroundColor: 'white', gap: 10 }}
                style={{ width: '100%', maxHeight: screen.height / 1.5, borderRadius: 10, marginBlock: 20 }}
            />

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
        backgroundColor: '#d6c9d6',
        flexDirection: 'column',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    loginText: {
        fontWeight: 'bold',
        fontFamily: 'Lexend',
        fontSize: 30,
        color: 'black',
        marginBottom: 5,
    },

    skipText: {
        fontWeight: '600',
        fontSize: 12,
        color: 'rgba(122, 122, 122, 1)'
    },

    text: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
        maxWidth: '75%',
        lineHeight: 20
    },

    avatar: {
        width: 43,
        height: 43,
        borderRadius: screen.width
    },

    name: {
        fontFamily: 'Lexend',
        fontWeight: '500',
        fontSize: 16,
    },

    absolute: {
        position: 'absolute',
        bottom: 30,
        width: '100%'
    }
})