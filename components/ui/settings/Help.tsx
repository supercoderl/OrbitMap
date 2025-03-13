import assets from "@/assets"
import { colors } from "@/constants/Colors";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import Horizontal from "../Horizontal";

const Help = () => {
    return (
        <View style={{ paddingHorizontal: 15, marginTop: 20, borderRadius: 10, zIndex: 1 }}>
            <View style={styles.optionContainer}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Trung tâm trợ giúp</Text>
                    <TouchableOpacity style={styles.chevron_right_container}>
                        <Image source={assets.image.chevron_right} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <Horizontal height={1} color="#D8DADC" />

                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Báo cáo sự cố</Text>
                    <TouchableOpacity style={styles.chevron_right_container}>
                        <Image source={assets.image.chevron_right} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <Horizontal height={1} color="#D8DADC" />

                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Đóng góp ý kiến</Text>
                    <TouchableOpacity style={styles.chevron_right_container}>
                        <Image source={assets.image.chevron_right} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Help;

const styles = StyleSheet.create({
    chevron_right_container: {
        borderWidth: 1,
        borderColor: colors.defaultBorder,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingBlock: 8,
        borderRadius: 10
    },

    icon: {
        width: 9,
        height: 15
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBlock: 5
    },

    optionContainer: {
        paddingBlock: 8,
        borderRadius: 10,
        gap: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1
    },
})