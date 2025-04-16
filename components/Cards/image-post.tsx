import assets from "@/assets";
import { store } from "@/redux";
import { PhotoPost } from "@/types";
import { convertTime } from "@/utils";
import screen from "@/utils/screen";
import { View, Text, Image, StyleSheet } from "react-native"

interface ImagePostProps {
    item: PhotoPost
}

const ImagePost: React.FC<ImagePostProps> = ({ ...props }) => {
    const { item } = props;
    const { userInfo } = store.getState().user;

    return (
        <View style={styles.container}>
            <Text style={styles.date}>{convertTime(item.sentAt)}</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                {item.annotationValue && <View style={styles.textContainer}><Text style={styles.text}>{item.annotationValue}</Text></View>}
            </View>

            <View style={styles.row}>
                <Image source={item.userInfo.avatar !== "" ? { uri: item.userInfo.avatar } : assets.avatar.maithy} style={styles.avatar} />
                <Text style={styles.text}>{userInfo?.userId === item.userInfo.userId ? 'You' : item.userInfo.fullname}</Text>
            </View>
        </View>
    )
}

export default ImagePost;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },

    date: {
        fontFamily: "LexendMedium",
        fontSize: 16
    },

    imageContainer: {
        position: 'relative',
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: screen.width / 1.43,
        height: screen.width / 1.43
    },

    textContainer: {
        position: 'absolute',
        bottom: 15,
        borderRadius: 40,
        paddingBlock: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },

    text: {
        fontFamily: 'LexendSemiBold',
        fontSize: 16
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    avatar: {
        width: 43,
        height: 43,
        borderRadius: screen.width
    }
})