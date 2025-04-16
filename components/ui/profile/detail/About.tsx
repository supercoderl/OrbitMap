import { View, Text, StyleSheet } from "react-native"

const About = () => {
    return (
        <View style={styles.aboutContainer}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            <Text style={styles.aboutText}>
                I believe that no one should ever have to choose between a career we love and living our lives with authenticity and integrity
            </Text>
        </View>
    )
}

export default About;

const styles = StyleSheet.create({
    aboutContainer: {
        width: '100%',
        marginTop: 30,
        alignItems: 'flex-start',
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'LexendSemiBold',
        color: '#333',
        marginBottom: 10,
    },
    aboutText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});