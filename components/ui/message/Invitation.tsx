import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NavBar from "../NavBar"
import assets from "@/assets"
import BackButton from "@/components/Buttons/back"
import Search from "@/components/Inputs/search";
import screen from "@/utils/screen";
import { useEffect, useState } from "react";
import { FriendShip } from "@/types";
import { toast } from "@/utils";
import { acceptRequest, cancelRequest, getFriendList } from "@/api/modules/friend-ship";
import { ActionStatus } from "@/enums";
import { colors } from "@/constants/Colors";
import Empty from "../Empty";

const InvitationItem = ({ item, refresh }: { item: FriendShip, refresh: () => void }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onAccept = async () => {
        try {
            setLoading(true);
            await acceptRequest({
                friendShipId: item.friendShipId
            });

            await refresh();
        }
        finally {
            setLoading(false);
        }
    }

    const onCancel = async () => {
        try {
            setLoading(true);
            await cancelRequest({
                friendShipId: item.friendShipId
            });

            await refresh();
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.friendContainer}>
            <Image source={{ uri: item.info.avatarUrl }} style={styles.friendAvatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.info.fullname}</Text>
            </View>
            <View style={styles.addUserContainer}>
                {
                    <TouchableOpacity
                        style={styles.addUserBtn}
                        onPress={onAccept}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <ActivityIndicator size={12} color={colors.white} />
                                :
                                <Image source={assets.icon.user_add_white} style={styles.add_user_2} />
                        }
                        <Text
                            style={styles.addUserText}
                        >
                            Accept
                        </Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={onCancel}>
                    <Image source={assets.icon.close_2} style={styles.close} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

interface InvitationProps {
    onClose: () => void;
    userId?: string | null;
}

const Invitation: React.FC<InvitationProps> = ({ ...props }) => {
    const { onClose, userId } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [requests, setRequests] = useState<FriendShip[]>([]);

    const onLoad = async () => {
        if (!userId) {
            toast.error("Something went wrong", "Please check again your authentication.", 2000);
            return;
        }
        try {
            setLoading(true);
            const { data } = await getFriendList({
                query: { pageSize: 10, pageIndex: 1 },
                actionType: "ReceivedRequests",
                searchTerm: "",
                status: ActionStatus.All,
                userId
            });

            if (data && data.items.length > 0) {
                setRequests(data.items);
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad()
    }, []);

    return (
        <View>
            <NavBar
                leftNode={
                    <BackButton
                        onPress={onClose}
                        buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                    />
                }
                rightNode={
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.finishText}>Done</Text>
                    </TouchableOpacity>
                }
                style={{ position: 'relative', top: 0 }}
            >
                <Text style={styles.title}>Add friend</Text>
            </NavBar>

            <View style={styles.contentContainer}>
                <Search
                    placeholder="Search friend..."
                    style={{ width: '100%', flex: 0 }}
                    items={[]} 
                    value={""} 
                    onChangeText={() => {}}                    
                />

                <View style={[styles.row, { gap: 12 }]}>
                    <View style={{ padding: 7.5, borderRadius: screen.width, backgroundColor: 'rgba(230, 234, 238, 1)' }}>
                        <Image source={assets.icon.contact} style={{ width: 24, height: 24 }} />
                    </View>

                    <Text style={[styles.finishText, { color: 'rgba(41, 45, 50, 1)', flex: 1 }]}>Invite your friend!</Text>

                    <TouchableOpacity>
                        <Image source={assets.image.chevron_right} style={{ width: 6.92307710647583, height: 11.538461685180664 }} />
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.finishText, { color: 'rgba(41, 45, 50, 1)' }]}>Friend invitation</Text>
                        <TouchableOpacity>
                            <Text style={[styles.finishText, { color: 'rgba(151, 151, 151, 1)' }]}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={requests}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <InvitationItem item={item} refresh={onLoad} />}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 15 }}
                        ListEmptyComponent={<Empty>
                            <TouchableOpacity onPress={onLoad}>
                                <Text>Reload</Text>
                            </TouchableOpacity>
                        </Empty>}
                    />
                </View>
            </View>
        </View>
    )
}

export default Invitation;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'LexendBold',
        fontSize: 20,
        color: 'rgba(41, 45, 50, 1)'
    },

    finishText: {
        fontFamily: 'LexendSemiBold',
        fontSize: 16,
        color: 'rgba(254, 167, 78, 1)'
    },

    contentContainer: {
        paddingBlock: 24,
        paddingHorizontal: 15,
        gap: 20
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

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
        gap: 5,
        backgroundColor: "#F0541C"
    },

    add_user_2: {
        width: 14,
        height: 14
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