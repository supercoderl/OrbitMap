import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const ActionButtons = () => {
    return (
        <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Edit my profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Statistics</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionButtons;

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: '#9747FF',
        paddingVertical: 12,
        borderRadius: 25,
        width: '48%',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: 'white',
        fontFamily: 'LexendMedium'
    },
    secondaryButton: {
        backgroundColor: 'white',
        paddingVertical: 12,
        borderRadius: 25,
        width: '48%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    secondaryButtonText: {
        color: '#666',
        fontFamily: 'LexendMedium'
    },
})