import assets from "@/assets";
import OrbitButton from "@/components/Buttons/default";
import { colors } from "@/constants/Colors";
import screen from "@/utils/screen";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Image source={assets.image.logo} style={styles.logo} />

            <View style={{ gap: 15, width: '100%', marginBottom: 50 }}>
                <OrbitButton
                    text={"Đăng nhập"}
                    onPress={() => router.push('/(auth)/login')}
                />
                <OrbitButton
                    text={"Tạo tài khoản"}
                    onPress={() => router.push('/(auth)/register')}
                    backgroundColor={colors.white}
                    color="black"
                />
            </View>

            <Image source={assets.image.logo2} style={styles.logo2} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 220
    },

    logo: {
        height: screen.height / 3.5,
        objectFit: 'contain',
        marginBottom: 40
    },

    logo2: {
        height: screen.height / 8,
        objectFit: 'contain',
        marginTop: 10
    }
})