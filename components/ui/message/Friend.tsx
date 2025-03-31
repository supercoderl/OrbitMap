import assets from "@/assets"
import { FriendShip, Message } from "@/types"
import screen from "@/utils/screen"
import React, { useState } from "react"
import { FlatList, TouchableOpacity, View, Image, Text, StyleSheet, RefreshControl } from "react-native"
import Empty from "../Empty"
import { router } from "expo-router"
import { colors } from "@/constants/Colors"
import { setFriendChat } from "@/redux/modules/chat/action"
import { store } from "@/redux"
import { orderBy, uniqBy } from "lodash"

interface FriendProps {
    userId?: string | null;
    messages: Message[];
    friends: FriendShip[];
    signal?: signalR.HubConnection | null
}

const Friend: React.FC<FriendProps> = ({ ...props }) => {
    const { userId, messages, friends, signal } = props;
    const [loading, setLoading] = useState<boolean>(false);

    const getMessage = (messages: Message[], item: FriendShip, userId?: string | null) => {
        if (!messages || !item || !userId)
            return {
                senderId: "",
                content: "",
                unreadMessageCount: 0
            }

        const filteredMessages = messages?.filter(msg =>
            (msg.senderId === userId && msg.receiverId === item.info.friendId) ||
            (msg.senderId === item.info.friendId && msg.receiverId === userId)
        );

        const mergedMessages = uniqBy(
            [...(item?.messages ?? []), ...filteredMessages],
            'messageId'
        );

        const latestMessage = orderBy(mergedMessages, ['createdAt'], ['desc'])[0];

        return {
            senderId: latestMessage?.senderId ?? "",
            content: latestMessage?.content ?? "",
            unreadMessageCount: mergedMessages?.filter(x =>
                x.isRead === false && x.senderId === item.info.friendId
            ).length ?? 0
        }
    };

    const onRefresh = async () => {
        try {
            setLoading(true);
            signal?.invoke("ChatData")
                .then(() => console.log("Requested updated from lobby"))
                .catch(err => console.error("Error requesting from lobby:", err));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <FlatList
            data={friends}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.friendContainer} onPress={() => {
                    if (item.userId === "89ace1ec-7132-44fa-994f-ecead6ba3b74")
                        console.log(item.messages);
                    store.dispatch(setFriendChat(item));
                    router.push('/(general)/message');
                }}>
                    <View style={{ position: 'relative' }}>
                        <Image source={{ uri: item.info.avatarUrl }} style={styles.friendAvatar} />
                        <View style={[styles.dot, { backgroundColor: item.info.status ? "#F0541C" : "#0A332D" }]} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{item.info.fullname}</Text>
                        <View style={styles.row}>
                            <Text style={styles.username}>{item.info.username}</Text>
                            <Image source={assets.icon.point_gray} style={{ width: 1.5, height: 1.5 }} />
                            {!item.info.status && <Text style={styles.username}>2 giờ trước</Text>}
                        </View>
                        {
                            getMessage(messages, item, userId).content !== "" &&
                            <Text
                                style={[
                                    styles.unreadMessageText,
                                    {
                                        color:
                                            getMessage(messages ?? [], item, userId).senderId !== userId &&
                                                getMessage(messages ?? [], item, userId).unreadMessageCount > 0
                                                ? 'black' : colors.defaultBorder,
                                        maxWidth: screen.width / 1.5
                                    }
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {getMessage(messages, item, userId).content}
                            </Text>
                        }
                    </View>
                    {
                        getMessage(messages ?? [], item, userId).senderId !== userId &&
                        getMessage(messages, item, userId).unreadMessageCount > 0 &&
                        <View style={styles.unreadMessageContainer}>
                            <Text style={styles.unreadMessageText}>{getMessage(messages, item, userId).unreadMessageCount}</Text>
                        </View>
                    }
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ borderTopWidth: 1, borderColor: '#D8DADC' }}
            style={{ marginBlock: 15 }}
            ListEmptyComponent={<Empty />}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
        />
    )
}

export default Friend;

const styles = StyleSheet.create({
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

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
})