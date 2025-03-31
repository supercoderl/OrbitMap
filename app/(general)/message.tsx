import assets from "@/assets";
import { orderBy, uniqBy } from 'lodash';
import Horizontal from "@/components/ui/Horizontal";
import NavBar from "@/components/ui/NavBar";
import { colors } from "@/constants/Colors";
import { RootState, store } from "@/redux";
import { FriendShip, Message as MessageInfo } from "@/types";
import screen from "@/utils/screen";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { setFriendChat, updateReduxUnreadMessages } from "@/redux/modules/chat/action";
import BackgroundLoading from "@/components/Loading/background-loading";
import { updateUnreadMessages } from "@/api/modules/message";

export default function Message() {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { signal, friend, friendMessages } = useSelector((state: RootState) => state.chat);
    const { userId } = store.getState().global;
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    const scrollViewRef = useRef<ScrollView>(null);

    const sendMessage = () => {
        signal?.invoke('friendMessage', {
            senderId: userId,
            receiverId: friend?.info?.friendId,
            content: message,
            mediaUrl: null
        });
        setMessage("");
    }

    useEffect(() => {
        if (!friend) return;

        const filteredMessages = friendMessages
            .filter(msg =>
                (msg.senderId === userId && msg.receiverId === friend.info.friendId) ||
                (msg.senderId === friend.info.friendId && msg.receiverId === userId)
            );

        const mergedMessages = uniqBy(
            [...filteredMessages, ...(friend?.messages ?? [])],
            'messageId'
        );

        setMessages(orderBy(mergedMessages, ['createdAt'], ['asc']));
    }, [friend, friendMessages]);

    useEffect(() => {
        if (messages.length > 0) {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const onUpdate = async (friend: FriendShip) => {
        // Just call api when there are some unread messages
        const unreadMessages = messages.filter(msg => msg.receiverId === userId && !msg.isRead);
        if (unreadMessages.length > 0 && lastUpdated !== unreadMessages.length) {
            const { data } = await updateUnreadMessages({
                senderId: friend.info.friendId,
                receiverId: userId
            });

            if (data) {
                store.dispatch(updateReduxUnreadMessages({
                    senderId: friend.info.friendId,
                    receiverId: userId
                }));
                signal?.invoke("ChatData")
                    .then(() => console.log("Requested updated chat data"))
                    .catch(err => console.error("Error requesting chat data:", err));

                setLastUpdated(unreadMessages.length);
            }
        }
    }

    useEffect(() => {
        if (!friend) return;

        onUpdate(friend);
    }, [friend, messages]);

    return (
        <View style={styles.container}>
            <NavBar
                leftNode={
                    <TouchableOpacity onPress={() => {
                        store.dispatch(setFriendChat(null));
                        router.back();
                    }}>
                        <Image source={assets.icon.back_square} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                }
                rightNode={
                    <TouchableOpacity>
                        <Image source={assets.icon.more_square} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                }
                style={{ position: 'relative', top: 0 }}
            >
                <View style={[styles.row, { gap: 12 }]}>
                    <Image source={friend ? { uri: friend.info.avatarUrl } : assets.avatar.thanhthu} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{friend?.info?.fullname ?? 'Thanh Thư'}</Text>
                        <Text style={styles.username}>{friend?.info?.username ?? 'thanhthl'}</Text>
                    </View>
                </View>
            </NavBar>

            <Horizontal height={1} color="rgba(216, 218, 220, 1)" styles={{ marginTop: 15 }} />

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    contentContainerStyle={{ gap: 10, paddingHorizontal: 20, paddingBlock: 10 }}
                >
                    {
                        messages.length > 0 ?
                            messages.map(item => (
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    width: '100%'
                                }}
                                    key={item.messageId}
                                >
                                    <View style={[
                                        styles.contentContainer,
                                        {
                                            alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
                                            backgroundColor: item.senderId === userId ? 'rgba(240, 84, 28, 0.62)' : colors.defaultBorder,
                                        }
                                    ]}
                                    >
                                        <Text
                                            style={[styles.content, { color: item.senderId === userId ? colors.white : colors.black }]}
                                        >
                                            {item.content}
                                        </Text>
                                    </View>
                                </View>
                            ))
                            :
                            null
                    }
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Send message..."
                            placeholderTextColor="#686868"
                            numberOfLines={1}
                            style={styles.input}
                            onChangeText={setMessage}
                            value={message}
                        />
                        <View style={styles.emojiContainer}>
                            <TouchableOpacity>
                                <Image source={assets.icon.emoji} style={styles.emoji} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={assets.icon.picture} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={sendMessage}>
                                <Image source={assets.icon.send_message} style={{ width: 32, height: 32 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {loading && <BackgroundLoading />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 32
    },

    avatar: {
        width: 43,
        height: 43,
        borderRadius: screen.width,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    name: {
        fontFamily: 'LexendBold',
        fontSize: 20,
        color: 'rgba(41, 45, 50, 1)'
    },

    username: {
        fontFamily: 'LexendRegular',
        color: 'rgba(169, 170, 171, 1)'
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
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 20,
        borderTopWidth: 1,
        borderTopColor: colors.defaultBorder
    },

    contentContainer: {
        borderRadius: 20,
        paddingBlock: 7,
        paddingHorizontal: 20,
        maxWidth: '75%'
    },

    content: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        lineHeight: 18,
        flexShrink: 1
    }
})