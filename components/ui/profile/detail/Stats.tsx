import { View, Text, StyleSheet } from "react-native"

const Stats = () => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>291</Text>
                <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
                <Text style={styles.statNumber}>6,200</Text>
                <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>789</Text>
                <Text style={styles.statLabel}>Following</Text>
            </View>
        </View>
    )
}

export default Stats;

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F1F1F1',
        paddingTop: 20,
    },
    statItem: {
        alignItems: 'center',
        width: '33%',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#F1F1F1',
    },
    statNumber: {
        fontSize: 18,
        fontFamily: 'LexendSemiBold'
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
})