import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import PersonalizeMapCard from "@/components/Cards/personalize-map";
import Horizontal from "@/components/ui/Horizontal";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const PERSONALIZE_MAPS = [
    {
        id: 1,
        title: "Biển Ngọc",
        map: assets.map.bienngoc,
        background: "#FEA74E"
    },
    {
        id: 2,
        title: "Sóng Xanh",
        map: assets.map.songxanh,
        background: "#FEA74E"
    },
    {
        id: 3,
        title: "Cát Mơ",
        map: assets.map.catmo,
        background: "#FEA74E"
    },
    {
        id: 4,
        title: "Rực Rỡ",
        map: assets.map.rucro,
        background: "#FEA74E"
    },
    {
        id: 5,
        title: "San Hô Rực Rỡ",
        map: assets.map.sanhorucro,
        background: "#FEA74E"
    },
    {
        id: 6,
        title: "Sắc Thu",
        map: assets.map.sacthu,
        background: "#FEA74E"
    },
    {
        id: 7,
        title: "Tuyết lở",
        map: assets.map.tuyetlo,
        background: "#FEA74E"
    },
    {
        id: 8,
        title: "Ran na",
        map: assets.map.ranna,
        background: "#FEA74E"
    },
    {
        id: 9,
        title: "Tuyết lở",
        map: assets.map.tuyetlo,
        background: "#FEA74E"
    },
    {
        id: 10,
        title: "Ran na",
        map: assets.map.ranna,
        background: "#FEA74E"
    }
]

export default function PersonalizeMap() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Bản đồ cá nhân hóa</Text>
                <Image source={assets.icon.vip} style={styles.vip} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <FlatList
                data={PERSONALIZE_MAPS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PersonalizeMapCard
                        item={item}
                    />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 15, alignItems: 'center', paddingBlock: 30 }}
                style={{ width: '100%' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: "baseline",
        paddingHorizontal: 15,
        gap: 15,
        width: '100%',
        paddingBottom: 10
    },

    title: {
        color: "#292D32",
        fontFamily: "LexendBold",
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },

    vip: {
        width: 27.064,
        height: 26.949
    }
})