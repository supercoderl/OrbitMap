import { View, Text, StyleSheet } from "react-native"

const Interest = () => {
    return (
        <View style={styles.interestsContainer}>
            <Text style={styles.sectionTitle}>INTEREST</Text>
            <View style={styles.interestTagsContainer}>
                <View style={[styles.interestTag, { backgroundColor: '#F3E9FF' }]}>
                    <Text style={[styles.interestTagText, { color: '#9747FF' }]}>Travel</Text>
                </View>
                <View style={[styles.interestTag, { backgroundColor: '#E4F9FF' }]}>
                    <Text style={[styles.interestTagText, { color: '#1EA1D7' }]}>Dance</Text>
                </View>
                <View style={[styles.interestTag, { backgroundColor: '#F1FFDC' }]}>
                    <Text style={[styles.interestTagText, { color: '#78C920' }]}>Fitness</Text>
                </View>
                <View style={[styles.interestTag, { backgroundColor: '#FFF9DE' }]}>
                    <Text style={[styles.interestTagText, { color: '#FFB800' }]}>Singing</Text>
                </View>
                <View style={[styles.interestTag, { backgroundColor: '#FFF1E9' }]}>
                    <Text style={[styles.interestTagText, { color: '#FF8A3C' }]}>Photography</Text>
                </View>
                <View style={[styles.interestTag, { backgroundColor: '#FFE9E4' }]}>
                    <Text style={[styles.interestTagText, { color: '#FF3C5F' }]}>Fitness</Text>
                </View>
                <View style={[styles.interestTag, { backgroundColor: '#E9FAFF' }]}>
                    <Text style={[styles.interestTagText, { color: '#3CAFFB' }]}>Swim</Text>
                </View>
            </View>
        </View>
    )
}

export default Interest;

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'LexendSemiBold',
        color: '#333',
        marginBottom: 10,
    },
    interestsContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'flex-start',
    },
    interestTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    interestTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    interestTagText: {
        fontSize: 12,
        fontFamily: 'LexendMedium'
    },
})