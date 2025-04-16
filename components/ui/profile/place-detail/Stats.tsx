import { Place } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, StyleSheet } from "react-native"

interface StatsProps {
    placeDetail: Place | null;
}

const Stats: React.FC<StatsProps> = ({ ...props }) => {
    const { placeDetail } = props;

    return (
        <View style={styles.statsContainer}>
            <View style={styles.stat}>
                <Text style={styles.statValue}>{placeDetail?.favoriteCount ?? 0}</Text>
                <Ionicons name="heart" size={18} color="#8a7cb8" />
            </View>
            <View style={styles.stat}>
                <Text style={styles.statValue}>7990 ft</Text>
                <Ionicons name="location" size={18} color="#8a7cb8" />
            </View>
            <View style={styles.stat}>
                <Text style={styles.statValue}>56</Text>
                <Ionicons name="camera" size={18} color="#8a7cb8" />
            </View>
        </View>
    )
}

export default Stats;

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 16,
        marginBottom: 16,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#8a7cb8',
        marginBottom: 4,
    },
})