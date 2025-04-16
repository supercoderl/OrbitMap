import assets from "@/assets";
import { View, Image, Text, StyleSheet } from "react-native"

const Status = () => {
    return (
        <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
                <View style={styles.statusIcon}>
                    <Image source={assets.icon.heart_black} style={{ width: 24, height: 24 }} />
                </View>
                <Text style={styles.statusText}>Single</Text>
            </View>
            <View style={styles.statusItem}>
                <View style={styles.statusIcon}>
                    <Image source={assets.icon.heart_black} style={{ width: 24, height: 24 }} />
                </View>
                <Text style={styles.statusText}>Female</Text>
            </View>
        </View>
    )
}

export default Status;

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    statusItem: {
        alignItems: 'center',
    },
    statusIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        marginTop: 5,
        fontSize: 14,
    },
})