import assets from "@/assets";
import screen from "@/utils/screen";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Horizontal from "../ui/Horizontal";
import { Post } from "@/types";

interface PostCardProps {
    item: Post;
}

const PostCard: React.FC<PostCardProps> = ({ ...props }) => {
    const { item } = props;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Image source={item.author.avatarUrl === "" ? assets.post.thaibinh : { uri: item.author.avatarUrl ?? "" }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.author.fullname}</Text>
                    <Text style={styles.location}>{item.author.location}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={assets.icon.more_square} style={styles.more} />
                </TouchableOpacity>
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={styles.contentContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                </View>
                <View style={[{ flex: 1 }, styles.imageContainer]}>
                    {[
                        assets.post.thaibinh_1,
                        assets.post.thaibinh_2,
                        assets.post.thaibinh_3,
                        assets.post.thaibinh_4
                    ].map((src: any, index: number) => (
                        <Image
                            key={index}
                            source={src}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ))}
                </View>
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={styles.operationContainer}>
                <View style={styles.operationBtnContainer}>
                    <TouchableOpacity>
                        <Image source={assets.icon.like} style={styles.operationIcon} />
                    </TouchableOpacity>
                    <Text>Hữu ích</Text>
                </View>
                <Horizontal width={1} height={'100%'} color="#D8DADC" />
                <View style={styles.operationBtnContainer}>
                    <TouchableOpacity>
                        <Image source={assets.icon.dislike} style={styles.operationIcon} />
                    </TouchableOpacity>
                    <Text>Không hữu ích</Text>
                </View>
                <Horizontal width={1} height={'100%'} color="#D8DADC" />
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={assets.icon.markbook} style={styles.operationIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PostCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBlock: 10,
        paddingHorizontal: 15
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: screen.width
    },

    name: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
    },

    location: {
        color: '#A9AAAB',
        fontFamily: 'LexendRegular',
        fontSize: 10,
    },

    more: {
        width: 28,
        height: 28,
    },

    contentContainer: {
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: 'center',
        flex: 1,
        paddingBlock: 10,
        paddingHorizontal: 15,
    },

    title: {
        fontFamily: 'LexendSemiBold',
        fontSize: 10,
    },

    content: {
        fontFamily: 'LexendRegular',
        fontSize: 10,
        marginTop: 15
    },

    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    image: {
        width: '46%',
        aspectRatio: 1
    },

    operationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },

    operationBtnContainer: {
        paddingBlock: 12,
        gap: 6,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    operationIcon: {
        width: 26,
        height: 26
    }
})