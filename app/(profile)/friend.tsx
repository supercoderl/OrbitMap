import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import Search from "@/components/Inputs/search";
import Horizontal from "@/components/ui/Horizontal";
import screen from "@/utils/screen";
import { router } from "expo-router";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";

const FRIENDS = [
    {
        id: 1,
        name: "Thảo Vy",
        avatar: assets.avatar.thaovy
    },
    {
        id: 2,
        name: "Anh Khoa",
        avatar: assets.avatar.anhkhoa
    },
    {
        id: 3,
        name: "Mai Thy",
        avatar: assets.avatar.maithy
    },
    {
        id: 4,
        name: "Huy Hoàng",
        avatar: assets.avatar.huyhoang
    },
    {
        id: 5,
        name: "Tường Vy",
        avatar: assets.avatar.tuongvy
    },
    {
        id: 6,
        name: "Thanh Thư",
        avatar: assets.avatar.thanhthu
    },
    {
        id: 7,
        name: "Thanh Uyên",
        avatar: assets.avatar.thanhuyen
    },
    {
        id: 8,
        name: "Nhật Minh",
        avatar: assets.avatar.anhkhoa
    },
    {
        id: 9,
        name: "Phương",
        avatar: assets.avatar.phuonganh
    },
    {
        id: 10,
        name: "Khải",
        avatar: assets.avatar.khang
    },
    {
        id: 11,
        name: "My",
        avatar: assets.avatar.maithy
    },
    {
        id: 12,
        name: "Tuấn",
        avatar: assets.avatar.tung
    }
]

export default function FriendScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Bạn bè</Text>
                <View style={{ width: 24 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={{ width: '100%', paddingHorizontal: 15, paddingBlock: 12 }}>
                <Search
                    placeholder="Thêm một người bạn mới"
                    placeholderTextColor="#7A7A7A"
                    style={{ width: '100%', flex: 0 }}
                />

                <View style={[styles.row, { marginTop: 20 }]}>
                    <Image source={assets.icon.people} style={{ width: 32, height: 32 }} />
                    <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 16, color: '#292D32' }}>Bạn bè của bạn</Text>
                </View>

                <FlatList
                    data={FRIENDS}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.row, { gap: 10 }]}>
                            <Image source={item.avatar} style={{ width: 43, height: 43, borderRadius: screen.width }} />
                            <Text style={{ fontFamily: 'LexendMedium', fontSize: 16, flex: 1 }}>{item.name}</Text>
                            <TouchableOpacity>
                                <Image source={assets.icon.close_2} style={{ width: 12, height: 12 }} />
                            </TouchableOpacity>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBlock: 15, gap: 15 }}
                />
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
        gap: 5
    }
})