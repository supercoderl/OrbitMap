import assets from "@/assets";
import CircleButton from "@/components/Buttons/circle-button";
import ImagePost from "@/components/Cards/image-post";
import NavBar from "@/components/ui/NavBar";
import screen from "@/utils/screen";
import { View, Image, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";

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
    return (
        <View style={styles.container}>
            <NavBar
                leftNode={
                    <Image source={assets.avatar.maithy} style={styles.avatar} />
                }
                rightNode={
                    <View style={{ position: 'relative' }}>
                        <CircleButton
                            icon={assets.icon.message_black}
                            size={21.5}
                            style={{ backgroundColor: '#D8DADC' }}
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
                <View style={{ backgroundColor: '#D8DADC', borderRadius: 50, paddingHorizontal: 40, paddingBlock: 5 }}>
                    <Text style={styles.text}>
                        Bạn bè
                    </Text>
                </View>
            </NavBar>

            <FlatList
                data={POSTS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ImagePost
                        item={item}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 15, paddingHorizontal: screen.width / 6.5 }}
            />

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
                    <TouchableOpacity>
                        <Image source={assets.icon.travel_time_vip} style={styles.operation} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={assets.icon.screenshot} style={styles.screenshot} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={assets.icon.export_file} style={styles.operation} />
                    </TouchableOpacity>
                </View>
            </View>
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
        gap: 5
    },

    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width
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
    }
});