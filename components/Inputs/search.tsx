import assets from "@/assets"
import { debounce } from "@/utils"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useRef, useState } from "react"
import { FlatList, Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle, Text, Keyboard } from "react-native"

interface SearchProps extends Omit<TextInputProps, 'style'> {
    style?: ViewStyle
    icon?: any,
    items: { label: string, value: string }[],
    value: string,
    onChangeText: (value: string) => void
}

const defaultLocations: { label: string, value: string }[] = [
    {
        label: 'University of Washington',
        value: 'uw-1'
    },
    {
        label: 'Woodland Park',
        value: 'woodland-park'
    },
    {
        label: 'University of Washington',
        value: 'uw-2',
    }
];

const Search: React.FC<SearchProps> = ({ ...props }) => {
    const { style, icon, items, onChangeText, value } = props;
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const handleTextChange = (text: string) => {
        onChangeText(text);
    };

    return (
        <View style={[styles.container, style]}>
            <Image source={icon ?? assets.icon.search} style={styles.icon} />
            <TextInput
                {...props}
                ref={inputRef}
                value={value}
                onChangeText={handleTextChange}
                style={styles.input}
                onBlur={() => {
                    // Delayed hiding of dropdown to allow for selection
                    setTimeout(() => setShowDropdown(false), 200);
                }}
            />

            {/* Dropdown for results */}
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
        fontFamily: 'LexendRegular',
    },

    dropdownContainer: {
        position: 'absolute',
        top: 52, // Adjust based on your search input height
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 100,
        maxHeight: 300,
    },
    locationItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    markerContainer: {
        marginRight: 12,
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        color: '#666',
    }
})