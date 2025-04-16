import assets from "@/assets"
import CircleButton from "@/components/Buttons/circle-button"
import OrbitModal from "@/components/Modals/default"
import Contact from "@/components/ui/message/Contact"
import Friend from "@/components/ui/message/Friend"
import Invitation from "@/components/ui/message/Invitation"
import NavBar from "@/components/ui/NavBar"
import { colors } from "@/constants/Colors"
import { RootState, store } from "@/redux"
import screen from "@/utils/screen"
import { router } from "expo-router"
import { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

export default function MessageScreen() {
    const { userInfo } = store.getState()?.user;
    const { friendMessages, friends, signal } = useSelector((state: RootState) => state.chat);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
                <NavBar
                    leftNode={
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => router.push("/(profile)")}>
                                <Image
                                    source={userInfo ? { uri: userInfo.avatarUrl } : assets.avatar.maithy}
                                    style={styles.avatar}
                                />
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
                                    onPress={() => setShowModal(true)}
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
                    <Text style={styles.message}>Message</Text>
                </NavBar>

                <Friend 
                    userId={userInfo?.userId} 
                    messages={friendMessages} 
                    friends={friends}
                    signal={signal}
                />

                <Contact 
                    userId={userInfo?.userId} 
                    signal={signal}
                />
            </View>

            <OrbitModal
                isOpen={showModal}
                showOverlay
                style={{ top: 0 }}
                innerStyle={{ marginTop: 32 }}
                onClose={() => setShowModal(false)}
            >
                <Invitation 
                    onClose={() => setShowModal(false)}
                    userId={userInfo?.userId}
                />
            </OrbitModal>
        </>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
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
        backgroundColor: colors.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },

    add_user_2: {
        width: 16,
        height: 16
    },

    addUserText: {
        fontFamily: 'LexendMedium',
        fontSize: 12,
        color: colors.white
    },

    close: {
        width: 12,
        height: 12
    }
})