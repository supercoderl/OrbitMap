import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import SharingModal from "@/components/Modals/sharing";
import Horizontal from "@/components/ui/Horizontal";
import { colors } from "@/constants/Colors";
import screen from "@/utils/screen";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function PassportScreen() {
    const [showModal, setShowModal] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Passport chứng nhận</Text>
                <Image source={assets.icon.vip} style={{ width: 27.06, height: 26.95 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={{ flex: 1, paddingHorizontal: 35, gap: 30, marginTop: 32, alignItems: 'center' }}>
                <Image source={assets.passport.my_passport} resizeMode="contain" style={{ height: 480.96 }} />

                <View style={{ width: '100%', gap: 15 }}>
                    <View style={[styles.row, { gap: 15 }]}>
                        <TouchableOpacity style={[styles.row, { backgroundColor: colors.primary, flex: 1, paddingBlock: 8, justifyContent: 'center', borderRadius: 40 }]}>
                            <Image source={assets.icon.edit_white} style={{ width: 32, height: 32 }} />
                            <Text style={styles.text}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row, { backgroundColor: colors.primary, flex: 1, paddingBlock: 8, justifyContent: 'center', borderRadius: 40 }]}>
                            <Image source={assets.icon.import_white} style={{ width: 32, height: 32 }} />
                            <Text style={styles.text}>Lưu</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.row, { backgroundColor: colors.primary, paddingBlock: 8, justifyContent: 'center', borderRadius: 40 }]}
                        onPress={() => setShowModal(true)}
                    >
                        <Image source={assets.icon.export_white} style={{ width: 32, height: 32 }} />
                        <Text style={styles.text}>Chia sẻ</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SharingModal 
                isOpen={showModal} 
                height={screen.height * 0.31}
                onClose={() => setShowModal(false)}
            />
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
        color: colors.primary,
        fontFamily: "LexendBold",
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },

    text: {
        fontFamily: 'LexendSemiBold',
        fontSize: 16,
        color: 'white'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});