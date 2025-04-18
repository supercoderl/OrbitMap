import { getPhotoPostList } from "@/api/modules/photoPost";
import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import CircleButton from "@/components/Buttons/circle-button";
import ImagePost from "@/components/Cards/image-post";
import BackgroundLoading from "@/components/Loading/background-loading";
import ImagePostLoading from "@/components/Loading/image-post";
import FriendModal from "@/components/Modals/friend";
import SharingModal from "@/components/Modals/sharing";
import NavBar from "@/components/ui/NavBar";
import { colors } from "@/constants/Colors";
import { ActionStatus } from "@/enums";
import { RootState, store } from "@/redux";
import { PhotoPost } from "@/types";
import screen from "@/utils/screen";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { View, Image, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, RefreshControl } from "react-native";
import { useSelector } from "react-redux";

const POSTS = [
    {
        id: 1,
        image: assets.post.muahoa,
        text: "mua hoa?",
        username: "Bạn",
        avatar: assets.avatar.maithy,
        date: new Date()
    },
    {
        id: 2,
        image: assets.post.hoane,
        text: "hoa nè",
        username: "Bạn",
        avatar: assets.avatar.maithy,
        date: new Date()
    }
]

export default function Post() {
    const [showModal, setShowModal] = useState(false);
    const [showFriendModal, setShowFriendModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photoPosts, setPhotoPosts] = useState<PhotoPost[]>([]);
    const { friends } = useSelector((state: RootState) => state.chat);
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

    const onLoad = async (scope: string = "mine", userId?: string) => {
        try {
            setLoading(true);
            const { data } = await getPhotoPostList({
                query: { pageIndex: 1, pageSize: 10 },
                searchTerm: "",
                status: ActionStatus.All,
                scope,
                userId
            });

            if (data && data.items) {
                setPhotoPosts(data.items);
            }
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    const onSelectFriend = async (friendId: string) => {
        setSelectedFriend(friendId);
        setShowFriendModal(false);
        if(friendId === "all") await onLoad("others");
        else if(userInfo && friendId === userInfo.userId) await onLoad("mine");
        else await onLoad("user", friendId);
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <View style={styles.container}>
            <NavBar
                leftNode={
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <BackButton
                            onPress={() => router.back()}
                        />
                    </View>
                }
                rightNode={
                    <View style={{ position: 'relative' }}>
                        <CircleButton
                            icon={assets.icon.message_black}
                            size={21.5}
                            style={{ backgroundColor: '#D8DADC' }}
                            onPress={() => router.push("/(home)/message")}
                        />
                        <View style={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            borderRadius: screen.width,
                            paddingHorizontal: 5,
                            zIndex: 2,
                            backgroundColor: '#F0541C',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: "white", fontSize: 10, fontFamily: "LexendSemiBold" }}>5</Text>
                        </View>
                    </View>
                }
                style={{ top: 32 }}
            >
                <TouchableOpacity
                    style={{ backgroundColor: '#D8DADC', borderRadius: 50, paddingHorizontal: 40, paddingBlock: 5 }}
                    onPress={() => setShowFriendModal(true)}
                >
                    <Text style={styles.text}>
                        Friends
                    </Text>
                </TouchableOpacity>
            </NavBar>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={photoPosts}
                    keyExtractor={(item) => item.photoPostId}
                    renderItem={({ item }) => (
                        <ImagePost
                            item={item}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 15, paddingHorizontal: screen.width / 6.5 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => onLoad()} />
                    }
                />

                {loading && <ImagePostLoading />}
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Gửi tin nhắn..."
                        placeholderTextColor="#686868"
                        numberOfLines={1}
                        style={styles.input}
                    />
                    <View style={styles.emojiContainer}>
                        <TouchableOpacity>
                            <Image source={assets.icon.emoji} style={styles.emoji} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={assets.icon.reactmotion} style={styles.emoji} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={assets.icon.pointmotion} style={styles.emoji} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={assets.icon.upload_file} style={{ width: 22, height: 22 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.operationContainer}>
                    <TouchableOpacity onPress={() => router.push('/(general)/time-travel')}>
                        <Image source={assets.icon.travel_time_vip} style={styles.operation} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push({ pathname: '/(home)', params: { openModal: "true" } })}>
                        <Image source={assets.icon.screenshot} style={styles.screenshot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image source={assets.icon.export_file} style={styles.operation} />
                    </TouchableOpacity>
                </View>
            </View>

            <SharingModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                height={screen.height * 0.4}
            >
                <View style={{ gap: 10, paddingHorizontal: 15 }}>
                    <View style={[styles.row, { width: '100%' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Image source={assets.icon.import_white} style={styles.icon} />
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image source={assets.icon.trash_white} style={styles.icon} />
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, { width: '100%' }]}>
                        <TouchableOpacity style={styles.button}>
                            <Image source={assets.icon.flag_white} style={styles.icon} />
                            <Text style={styles.buttonText}>Báo cáo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image source={assets.icon.slash_white} style={styles.icon} />
                            <Text style={styles.buttonText}>Chặn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SharingModal>

            <FriendModal
                visible={showFriendModal}
                onClose={() => setShowFriendModal(false)}
                friends={friends}
                userInfo={userInfo}
                selectedFriend={selectedFriend}
                onSelect={onSelectFriend}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
    },

    text: {
        fontFamily: "LexendBold",
        fontSize: 20,
        color: '#292D32'
    },

    inputContainer: {
        borderRadius: 40,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBlock: 5,
        justifyContent: 'space-between',
        gap: 10
    },

    input: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1
    },

    emojiContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },

    emoji: {
        width: 28,
        height: 28,
    },

    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 20
    },

    operationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    operation: {
        width: 40,
        height: 40
    },

    screenshot: {
        width: 80,
        height: 80
    },

    icon: {
        width: 32,
        height: 32
    },

    button: {
        flex: 1,
        borderRadius: 40,
        paddingBlock: 6,
        flexDirection: 'row',
        gap: 5,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontFamily: 'LexendSemiBold',
        fontSize: 16,
        color: 'white'
    }
});