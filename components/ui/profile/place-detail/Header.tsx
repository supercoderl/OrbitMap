import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const Header = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Place Detail</Text>
            <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'LexendMedium'
    },
    shareButton: {
        padding: 8,
    },
    shareText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'LexendMedium'
    },
})