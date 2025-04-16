import { addFriend, cancelRequest, getContactList } from "@/api/modules/friend-ship";
import assets from "@/assets";
import { colors } from "@/constants/Colors";
import { ActionStatus, FriendShipStatus } from "@/enums";
import { ContactInfo } from "@/types";
import { toast } from "@/utils";
import screen from "@/utils/screen";
import { useEffect, useState } from "react";
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import Empty from "../Empty";
import { ServerRes } from "@/redux/interface";

const ContactItem = (
    { item, userId, refresh, signal }: {
        item: ContactInfo,
        userId?: string | null,
        refresh: () => void,
        signal?: signalR.HubConnection | null;
    }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onAdd = async () => {
        if (!userId) {
            toast.error("Something went wrong", "Please check again your authentication.", 2000);
            return;
        }
        try {
            setLoading(true);
            await signal?.invoke('AddFriend', item.friendId).then(async (res) => {
                await refresh();
            });
        }
        finally {
            setLoading(false);
        }
    }

    const onCancel = async () => {
        if (!userId) {
            toast.error("Something went wrong", "Please check again your authentication.", 2000);
            return;
        }

        try {
            setLoading(true);
            await cancelRequest({
                friendShipId: null,
                userId,
                friendId: item.friendId
            });

            await refresh();
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.friendContainer}>
            <Image source={{ uri: item.avatarUrl }} style={styles.friendAvatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.fullname}</Text>
            </View>
            <View style={styles.addUserContainer}>
                {
                    <TouchableOpacity
                        style={[styles.addUserBtn, { backgroundColor: item.status === FriendShipStatus.Pending ? "#ECDCBF" : colors.primary }]}
                        onPress={item.status === FriendShipStatus.Pending ? onCancel : onAdd}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <ActivityIndicator size={12} color={colors.white} />
                                :
                                item.status === FriendShipStatus.Pending ?
                                    null
                                    :
                                    <Image source={assets.icon.user_add_white} style={styles.add_user_2} />
                        }
                        <Text
                            style={[styles.addUserText, { color: item.status === FriendShipStatus.Pending ? colors.black : colors.white }]}
                        >
                            {item.status === FriendShipStatus.Pending ? 'Cancel' : 'Add'}
                        </Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity>
                    <Image source={assets.icon.close_2} style={styles.close} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

interface ContactProps {
    userId?: string | null;
    signal?: signalR.HubConnection | null;
}

const Contact: React.FC<ContactProps> = ({ ...props }) => {
    const { userId, signal } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [contacts, setContacts] = useState<ContactInfo[]>([]);

    const onLoad = async () => {
        if (!userId) {
            toast.error("Something went wrong", "Please check again your authentication.", 2000);
            return;
        }
        try {
            setLoading(true);
            const { data } = await getContactList({
                query: { pageSize: 10, pageIndex: 1 },
                searchTerm: "",
                actionType: "",
                status: ActionStatus.All,
                userId
            });

            if (data && data.items.length > 0) {
                setContacts(data.items);
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();

        signal?.on('addFriend', onLoad);

        return () => {
            signal?.off('addFriend', onLoad);
        };
    }, []);

    return (
        <>
            <Text style={styles.addText}>Add contact</Text>

            <FlatList
                data={contacts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ContactItem item={item} userId={userId} refresh={onLoad} signal={signal} />}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15 }}
                ListEmptyComponent={<Empty />}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onLoad} />
                }
            />
        </>
    )
}

export default Contact;

const styles = StyleSheet.create({
    friendContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#D8DADC'
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