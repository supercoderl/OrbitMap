import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface PersonalizeMapCardProps {
    item: any
}

const PersonalizeMapCard: React.FC<PersonalizeMapCardProps> = ({ ...props }) => {
    const { item } = props;

    return (
        <TouchableOpacity style={styles.container}>
            <Image source={item.map} style={styles.map} />
            <View style={[styles.titleContainer, { backgroundColor: item.background }]}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PersonalizeMapCard;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: "hidden",
        marginHorizontal: 20
    },

    map: {
        width: 146,
        height: 146
    },

    titleContainer: {
        paddingBlock: 10,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5
    },

    title: {
        color: "white",
        fontSize: 14,
        fontFamily: 'LexendRegular',
        letterSpacing: -0.7
    }
})