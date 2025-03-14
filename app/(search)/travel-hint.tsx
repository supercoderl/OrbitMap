import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import Search from "@/components/Inputs/search";
import Horizontal from "@/components/ui/Horizontal";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TravelHint() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Gợi ý kế hoạch du lịch</Text>
                <Image source={assets.icon.vip} style={{ width: 27.06, height: 26.95 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={{ paddingBlock: 10, paddingHorizontal: 15 }}>
                <View style={styles.row}>
                    <Search
                        icon={assets.icon.discover_inactive}
                        value="Đà Lạt"
                        editable={false}
                    />
                    <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 16, color: '#F0541C' }}>3N2D</Text>
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

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})