import assets from "@/assets"
import { Image, StyleSheet, TextInput, TextInputProps, View } from "react-native"

interface SearchProps extends TextInputProps { }

const Search: React.FC<SearchProps> = ({ ...props }) => {
    return (
        <View style={styles.container}>
            <Image source={assets.icon.search} style={styles.icon} />
            <TextInput
                {...props}
                style={styles.input}
            />
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "rgba(230, 234, 238, 1)",
        gap: 8,
        paddingHorizontal: 15,
        flex: 1
    },

    icon: {
        width: 15.39,
        height: 15.39,
    },

    input: {
        fontSize: 16,
        fontFamily: 'Lexend',
        fontStyle: 'normal'
    }
})