import screen from "@/utils/screen";
import { View, Text, Image, StyleSheet } from "react-native"

interface ImagePostProps {
    item: any
}

const ImagePost: React.FC<ImagePostProps> = ({ ...props }) => {
    const { item } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.date}>Bây giờ</Text>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                {item.text && <View style={styles.textContainer}><Text style={styles.text}>{item.text}</Text></View>}
            </View>

            <View style={styles.row}>
                <Image source={item.avatar} style={styles.avatar} />
                <Text style={styles.text}>{item.username}</Text>
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