import { colors } from "@/constants/Colors"
import { View, Text, StyleSheet } from "react-native"

const Personal = () => {
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Speciality</Text>
                <Text style={styles.detailValue}>Designer</Text>
            </View>
            <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Born</Text>
                <Text style={styles.detailValue}>June 10, 1986</Text>
            </View>
            <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Height</Text>
                <Text style={styles.detailValue}>162 cm</Text>
            </View>
        </View>
    )
}

export default Personal;

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        paddingBlock: 15,
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    detailColumn: {
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#999',
    },
    detailValue: {
        fontSize: 14,
        fontFamily: 'LexendMedium',
        marginTop: 4,
    },
})