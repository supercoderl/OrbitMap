import { colors } from "@/constants/Colors";
import { store } from "@/redux";
import { setThemeConfig } from "@/redux/modules/global/action";
import { MapTheme } from "@/types/map-theme";
import { toast } from "@/utils";
import { router } from "expo-router";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";

interface PersonalizeMapCardProps {
    item: MapTheme
}

const PersonalizeMapCard: React.FC<PersonalizeMapCardProps> = ({ ...props }) => {
    const { item } = props;
    const themeConfig = store.getState().global?.themeConfig;

    const onSelect = () => {
        if (themeConfig) {
            store.dispatch(setThemeConfig({
                ...themeConfig,
                mapStyle: item.mapStyle
            }));
            toast.success("Selected theme successfully.", `${item.name} was selected!`);
            router.back();
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onSelect}>
            <Image source={{ uri: item.previewUrl }} style={styles.map} />
            <View style={[styles.titleContainer, { backgroundColor: colors.primary }]}>
                <Text style={styles.title}>{item.name}</Text>
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
        opacity: 0.8
    },

    title: {
        color: "white",
        fontSize: 14,
        fontFamily: 'LexendRegular',
        letterSpacing: -0.7
    }
})