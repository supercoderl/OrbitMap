import assets from "@/assets"
import BackButton from "@/components/Buttons/back"
import OrbitModal from "@/components/Modals/default"
import Horizontal from "@/components/ui/Horizontal"
import AdOptional from "@/components/ui/settings/AdOptional"
import EditAccount from "@/components/ui/settings/EditAccount"
import Help from "@/components/ui/settings/Help"
import History from "@/components/ui/settings/History"
import Security from "@/components/ui/settings/Security"
import { colors } from "@/constants/Colors"
import { store } from "@/redux"
import { setRefreshToken, setToken } from "@/redux/modules/global/action"
import { toast } from "@/utils"
import screen from "@/utils/screen"
import { router, useFocusEffect } from "expo-router"
import React, { useCallback, useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import * as ImagePicker from 'expo-image-picker';

const OPTIONS: { id: number, name: string, type: "account" | "security" | "history" | "ad" | "help", icon: any }[] = [
    {
        id: 1,
        name: "Tài khoản",
        type: "account",
        icon: assets.icon.profile_circle
    },
    {
        id: 2,
        name: "Mật khẩu & bảo mật",
        type: "security",
        icon: assets.icon.shield_security
    },
    {
        id: 3,
        name: "Lịch sử tìm kiếm",
        type: "history",
        icon: assets.icon.search_status
    },
    {
        id: 4,
        name: "Tùy chọn quảng cáo",
        type: "ad",
        icon: assets.icon.ad
    },
    {
        id: 5,
        name: "Trợ giúp và hỗ trợ",
        type: "help",
        icon: assets.icon.question
    },
]

export default () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"account" | "ad" | "help" | "security" | "history" | null>(null);
    const { userInfo } = store.getState().user;
    const [avatar, setAvatar] = useState(userInfo ? userInfo.avatarUrl : assets.avatar.maithy);

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

    const openModal = (type: "account" | "ad" | "help" | "security" | "history") => {
        setModalType(type);
        setShowModal(true);
    }

    const closeModal = () => {
        setModalType(null);
        setShowModal(false);
    }

    const render = () => {
        switch (modalType) {
            case "account":
                return <EditAccount userInfo={userInfo} />
            case "ad":
                return <AdOptional />
            case "help":
                return <Help />
            case "history":
                return <History />
            case "security":
                return <Security />
        }
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowModal(false); // Reset modal khi rời khỏi màn hình
            };
        }, [])
    );

    const logout = () => {
        store.dispatch(setToken(""));
        store.dispatch(setRefreshToken(""));
        toast.success("Logout successful!");
        router.replace("/(auth)");
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
                <View style={styles.headerContainer}>
                    <BackButton
                        onPress={() => router.back()}
                        buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                    />
                    <Text style={styles.title}>Cài đặt</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 16, color: colors.primary }}>Xong</Text>
                    </TouchableOpacity>
                </View>

                <Horizontal height={1} color="#D8DADC" />

                <View style={{ flex: 1, paddingBlock: 32 }}>
                    <View style={{ gap: 10, width: '100%', alignItems: 'center' }}>
                        <View style={{ position: 'relative', justifyContent: 'center' }}>
                            <Image
                                source={
                                    typeof avatar === 'string' &&
                                        (avatar.includes('data:image/jpeg;base64') || avatar.includes('http')) ?
                                        { uri: avatar } : avatar}
                                style={styles.avatar} resizeMode="cover"
                            />
                            <TouchableOpacity style={{
                                position: 'absolute',
                                width: 31,
                                height: 31,
                                borderRadius:
                                    screen.width,
                                backgroundColor: '#D9D9D9',
                                bottom: 0,
                                right: 0,
                                borderWidth: 2,
                                borderColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={pickImage}
                            >
                                <Image source={assets.icon.camera_white} style={{ width: 22, height: 22 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            fontFamily: 'LexendBold',
                            fontSize: 24,
                            color: colors.primary
                        }}>{userInfo ? userInfo.fullname : "Nomads"}</Text>
                    </View>

                    <View style={{ paddingHorizontal: 15, marginTop: 20, borderRadius: 10, zIndex: 1 }}>
                        <View style={styles.optionContainer}>
                            {
                                OPTIONS.map(item => (
                                    <React.Fragment key={item.id}>
                                        <View style={styles.buttonContainer}>
                                            <Image source={item.icon} style={{ width: 32, height: 32 }} />
                                            <Text style={styles.buttonText}>{item.name}</Text>
                                            <TouchableOpacity style={styles.chevron_right_container} onPress={() => openModal(item.type)}>
                                                <Image source={assets.image.chevron_right} style={styles.icon} />
                                            </TouchableOpacity>
                                        </View>
                                        {OPTIONS[OPTIONS.length - 1].id !== item.id && <Horizontal height={1} color="#D8DADC" />}
                                    </React.Fragment>
                                ))
                            }
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 15, marginTop: 20, borderRadius: 10, zIndex: 1 }}>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
                                <Image source={assets.icon.logout} style={{ width: 32, height: 32 }} />
                                <Text style={styles.buttonText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <OrbitModal
                isOpen={showModal}
                showOverlay
                style={{ top: 0, paddingTop: 32 }}
                onClose={() => setShowModal(false)}
            >
                <View style={styles.headerContainer}>
                    <BackButton
                        onPress={closeModal}
                        buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                    />
                    <Text style={styles.title}>{OPTIONS.find(x => x.type === modalType)?.name}</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 16, color: colors.primary }}>Xong</Text>
                    </TouchableOpacity>
                </View>

                {render()}
            </OrbitModal>
        </>
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

    chevron_right_container: {
        borderWidth: 1,
        borderColor: colors.defaultBorder,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingBlock: 8,
        borderRadius: 10
    },

    icon: {
        width: 9,
        height: 15
    },

    avatar: {
        width: screen.width / 3.33,
        height: screen.width / 3.33,
        borderRadius: screen.width,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBlock: 5
    },

    optionContainer: {
        paddingBlock: 8,
        borderRadius: 10,
        gap: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1,
        color: colors.primary
    },

    secondText: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: '#A9AAAB'
    }
});