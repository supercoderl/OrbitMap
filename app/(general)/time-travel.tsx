import assets from "@/assets"
import BackButton from "@/components/Buttons/back"
import Horizontal from "@/components/ui/Horizontal"
import { router } from "expo-router"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

export default function TimeTravelScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Du hành thời gian</Text>
                <Image source={assets.icon.vip} style={{ width: 27.06, height: 22.83 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 28 }}>
                <Image source={assets.post.muahoa} style={{ width: '100%', borderRadius: 40 }} resizeMode="contain" />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Image source={assets.icon.bubble_white} style={{ width: 32, height: 32 }} />
                        <Text style={styles.text}>Tùy chọn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={assets.icon.import_white} style={{ width: 32, height: 32 }} />
                        <Text style={styles.text}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: "baseline",
        paddingHorizontal: 15,
        gap: 15,
        width: '100%',
        paddingBottom: 10
    },

    title: {
        color: "#292D32",
        fontFamily: "LexendBold",
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },

    text: {
        fontFamily: 'LexendSemiBold',
        fontSize: 16,
        color: "white"
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%'
    },

    button: {
        borderRadius: 40,
        paddingBlock: 6,
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        gap: 10,
        backgroundColor: "rgba(240, 84, 28, 0.78)"
    },
})