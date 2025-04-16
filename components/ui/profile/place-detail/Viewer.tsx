import { colors } from "@/constants/Colors";
import { View, Image, Text, StyleSheet } from "react-native"

const Viewer = () => {
    return (
        <View style={styles.avatarContainer}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Image
                    key={item}
                    source={{ uri: `https://hanoilarosahotel.com/wp-content/uploads/2024/06/dia-diem-du-lich-o-ha-noi-1-1170x650-1.jpg` }}
                    style={styles.avatar}
                />
            ))}
            <View style={styles.moreAvatar}>
                <Text style={styles.moreAvatarText}>5+</Text>
            </View>
            <Text style={styles.wereHereText}>were here</Text>
        </View>
    )
}

export default Viewer;

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: -8,
        borderWidth: 2,
        borderColor: colors.white,
    },
    moreAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderWidth: 2,
        borderColor: colors.white,
    },
    moreAvatarText: {
        fontSize: 12,
        fontFamily: 'LexendSemiBold',
        color: '#666',
    },
    wereHereText: {
        fontSize: 14,
        color: '#888',
    },
})