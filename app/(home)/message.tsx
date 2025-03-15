import assets from "@/assets"
import CircleButton from "@/components/Buttons/circle-button"
import NavBar from "@/components/ui/NavBar"
import screen from "@/utils/screen"
import { router } from "expo-router"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const FRIENDS = [
    {
        id: 1,
        name: "Thảo Vy",
        username: "thaovymc1",
        isOnline: false,
        latestOnline: new Date(),
        avatar: assets.avatar.thaovy,
        unreadMessageCount: 0
    },
    {
        id: 2,
        name: "Thanh Thư",
        username: "thanhthl",
        isOnline: false,
        latestOnline: new Date(),
        avatar: assets.avatar.thanhthu,
        unreadMessageCount: 4
    },
    {
        id: 3,
        name: "Anh Khoa",
        username: "a_khoa03",
        isOnline: true,
        latestOnline: new Date(),
        avatar: assets.avatar.anhkhoa,
        unreadMessageCount: 0
    },
    {
        id: 4,
        name: "Mai Thy",
        username: "malthyne",
        isOnline: true,
        latestOnline: new Date(),
        avatar: assets.avatar.maithy,
        unreadMessageCount: 2
    },
    {
        id: 5,
        name: "Huy Hoàng",
        username: "hhuy_it",
        isOnline: true,
        latestOnline: new Date(),
        avatar: assets.avatar.huyhoang,
        unreadMessageCount: 0
    },
    {
        id: 6,
        name: "Tường Vy",
        username: "tvy",
        isOnline: false,
        latestOnline: new Date(),
        avatar: assets.avatar.tuongvy,
        unreadMessageCount: 0
    }
]

export default function MessageScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <NavBar
                leftNode={
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => router.push("/(profile)")}>
                            <Image source={assets.avatar.maithy} style={styles.avatar} />
                        </TouchableOpacity>
                        <CircleButton
                            icon={assets.icon.search}
                            size={15.39}
                            style={{ backgroundColor: '#E6EAEE' }}
                            onPress={() => router.push("/(search)")}
                        />
                    </View>
                }
                rightNode={
                    <View style={styles.row}>
                        <View style={{ position: 'relative' }}>
                            <CircleButton
                                icon={assets.icon.user_add}
                                size={25}
                                style={{ backgroundColor: '#E6EAEE' }}
                            />
                            <View style={{ position: 'absolute', top: -2, right: -2, borderRadius: 50, paddingHorizontal: 4, zIndex: 2, backgroundColor: '#F0541C' }}>
                                <Text style={{ color: "white", fontSize: 10, fontFamily: "LexendSemiBold" }}>40</Text>
                            </View>
                        </View>
                        <CircleButton
                            icon={assets.icon.edit}
                            size={22}
                            style={{ backgroundColor: '#E6EAEE' }}
                        />
                    </View>
                }
                style={{ position: 'relative', top: 0 }}
            >
                <Text style={styles.message}>Tin nhắn</Text>
            </NavBar>

            <FlatList
                data={FRIENDS}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.friendContainer}>
                        <View style={{ position: 'relative' }}>
                            <Image source={item.avatar} style={styles.friendAvatar} />
                            <View style={[styles.dot, { backgroundColor: item.isOnline ? "#F0541C" : "#0A332D" }]} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.row}>
                                <Text style={styles.username}>{item.username}</Text>
                                <Image source={assets.icon.point_gray} style={{ width: 1.5, height: 1.5 }} />
                                {!item.isOnline && <Text style={styles.username}>2 giờ trước</Text>}
                            </View>
                        </View>
                        {item.unreadMessageCount > 0 &&
                            <View style={styles.unreadMessageContainer}>
                                <Text style={styles.unreadMessageText}>{item.unreadMessageCount}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ borderTopWidth: 1, borderColor: '#D8DADC' }}
                style={{ marginBlock: 15 }}
            />

            <Text style={styles.addText}>Thêm liên hệ</Text>

            <FlatList
                data={FRIENDS}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.friendContainer}>
                        <Image source={item.avatar} style={styles.friendAvatar} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <View style={styles.addUserContainer}>
                            <TouchableOpacity style={styles.addUserBtn}>
                                <Image source={assets.icon.user_add_2} style={styles.add_user_2} />
                                <Text style={styles.addUserText}>Thêm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={assets.icon.close_2} style={styles.close} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    message: {
        color: '#292D32',
        fontFamily: 'LexendBold',
        fontSize: 20,
    },

    friendContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#D8DADC'
    },

    dot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: screen.width,
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: "white"
    },

    friendAvatar: {
        width: 43,
        height: 43,
        borderRadius: screen.width
    },

    name: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
    },

    username: {
        color: '#A9AAAB',
        fontFamily: 'LexendRegular',
        fontSize: 11
    },

    unreadMessageContainer: {
        width: 20,
        height: 20,
        borderRadius: screen.width,
        paddingHorizontal: 6,
        backgroundColor: "#F0541C",
        alignItems: 'center',
        justifyContent: 'center'
    },

    unreadMessageText: {
        color: "white",
        fontFamily: "LexendRegular",
        fontSize: 11
    },

    addText: {
        color: "#292D32",
        fontFamily: "LexendBold",
        fontSize: 20,
        paddingHorizontal: 10,
    },

    addUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },

    addUserBtn: {
        flexDirection: 'row',
        paddingBlock: 5,
        paddingHorizontal: 15,
        backgroundColor: "#FEA74E",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },

    add_user_2: {
        width: 12.07,
        height: 17.145
    },

    addUserText: {
        fontFamily: 'LexendMedium',
        fontSize: 12,
    },

    close: {
        width: 12,
        height: 12
    }
})