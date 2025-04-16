import { getMapThemeList } from "@/api/modules/map-theme";
import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import PersonalizeMapCard from "@/components/Cards/personalize-map";
import Horizontal from "@/components/ui/Horizontal";
import { colors } from "@/constants/Colors";
import { ActionStatus } from "@/enums";
import { MapTheme } from "@/types/map-theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, RefreshControl } from "react-native";

export default function PersonalizeMap() {
    const [loading, setLoading] = useState<boolean>(false);
    const [mapThemes, setMapThems] = useState<MapTheme[]>([]);

    const onLoad = async () => {
        try {
            setLoading(true);
            const { data } = await getMapThemeList({
                query: { pageSize: 10, pageIndex: 1 },
                searchTerm: "",
                status: ActionStatus.All
            });

            setMapThems(data?.items ?? []);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Personalized map</Text>
                <Image source={assets.icon.vip} style={styles.vip} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <FlatList
                data={mapThemes}
                keyExtractor={(item) => item.mapThemeId}
                renderItem={({ item }) => (
                    <PersonalizeMapCard
                        item={item}
                    />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 15, alignItems: 'center', paddingBlock: 30 }}
                style={{ width: '100%' }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onLoad} />
                }
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
        color: colors.primary,
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