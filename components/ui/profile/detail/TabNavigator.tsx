import assets from "@/assets"
import { TouchableOpacity, View, Image, StyleSheet } from "react-native"

const TabNavigator = () => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabItem}>
                <Image source={assets.icon.grid_unselected} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Image source={assets.icon.play_circle_unselected} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Image source={assets.icon.people_unselected} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Image source={assets.icon.document_unselected} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

export default TabNavigator;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 30,
        marginBottom: 15,
    },
    tabItem: {
        padding: 10,
    },
})