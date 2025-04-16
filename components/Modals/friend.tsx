import assets from "@/assets";
import { colors } from "@/constants/Colors";
import { FriendShipStatus } from "@/enums";
import { store } from "@/redux";
import { FriendShip, User } from "@/types";
import screen from "@/utils/screen";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Modal, Pressable, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"

interface FriendModalProps {
    visible: boolean;
    onClose: () => void;
    friends: FriendShip[];
    onSelect: (friendId: string) => void;
    userInfo: User | null;
    selectedFriend: string | null;
}

const FriendModal: React.FC<FriendModalProps> = ({ ...props }) => {
    const { visible, onClose, friends, userInfo, selectedFriend, onSelect } = props;

    const renderFriendItem = ({ item }: { item: FriendShip }) => {
        if (item.info.friendId === 'all') {
            return (
                <TouchableOpacity style={styles.headerItem} onPress={() => onSelect(item.info.friendId)}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: screen.width,
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Ionicons
                            name="people"
                            color="#fff"
                            size={16}
                        />
                    </View>
                    <Text style={styles.headerText}>{item.info.fullname}</Text>
                    <Ionicons name="chevron-forward" size={24} color="#777" />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity style={styles.friendItem} onPress={() => onSelect(item.info.friendId)}>
                <Image
                    source={{ uri: item.info.avatarUrl }}
                    style={styles.avatar}
                />
                <Text style={styles.friendName}>{item.info.fullname}</Text>
                <Ionicons name="chevron-forward" size={24} color="#777" />
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.centeredView}
                onPress={onClose}
            >
                <Pressable
                    style={styles.modalView}
                    onPress={e => e.stopPropagation()}
                >
                    <FlatList
                        data={[{
                            friendShipId: 'all',
                            userId: '',
                            createdAt: new Date(),
                            info: {
                                avatarUrl: '',
                                fullname: 'All friends',
                                friendId: 'all',
                                username: '',
                                status: FriendShipStatus.Accepted
                            },
                            messages: []
                        }, ...friends, {
                            friendShipId: 'none',
                            userId: '',
                            createdAt: new Date(),
                            info: {
                                avatarUrl: userInfo?.avatarUrl || "",
                                fullname: "You",
                                friendId: userInfo?.userId || "",
                                username: userInfo?.username || "",
                                status: FriendShipStatus.Accepted
                            },
                            messages: []
                        }]}
                        renderItem={renderFriendItem}
                        keyExtractor={item => item.friendShipId}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        style={styles.list}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default FriendModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        paddingTop: screen.width / 4,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '85%',
        maxHeight: '70%',
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    headerText: {
        color: '#222222',
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        marginLeft: 10,
        fontFamily: 'LexendSemiBold'
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: screen.width,
    },
    friendName: {
        color: '#222222',
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        fontFamily: 'LexendSemiBold'
    },
    separator: {
        height: 0.5,
        backgroundColor: colors.defaultBorder,
    },
    list: {
        maxHeight: '100%',
    },
});