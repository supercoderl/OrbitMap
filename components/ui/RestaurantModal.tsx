import { FlatList, StyleSheet, View, Text, Image, RefreshControl } from "react-native"
import Search from "../Inputs/search";
import CircleButton from "../Buttons/circle-button";
import assets from "@/assets";
import ModularCard from "@/components/Cards/modular";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPlaceList } from "@/api/modules/place";
import { Place } from "@/types/place";
import BackgroundLoading from "../Loading/background-loading";
import { PlaceType } from "@/enums";
import { debounce, formatDistance } from "@/utils";

interface RestaurantModalProps {
    onClose: () => void;
    latitude: number;
    longitude: number;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ ...props }) => {
    const { onClose, latitude, longitude } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [restaurants, setRestaurants] = useState<Place[]>([]);

    const onLoad = async (text: string = "") => {
        try {
            setLoading(true);
            const { data } = await getPlaceList({
                query: { pageIndex: 1, pageSize: 10 },
                searchTerm: text,
                status: 0,
                types: [0, 1]
            });

            if (data?.items && data.items.length > 0)
                setRestaurants(data.items);
        }
        finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    const debouncedOnLoad = useMemo(() => debounce(onLoad, 500), []);

    const onSearch = (text: string) => {
        debouncedOnLoad(text);
        setText(text);
    }

    useEffect(() => {
        onLoad()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.row, { width: '100%', gap: 10, paddingHorizontal: 20, paddingBottom: 17 }]}>
                <Search
                    placeholder="Search for location"
                    onChangeText={onSearch}
                    items={[]}
                    value={text}
                />
                <CircleButton
                    icon={assets.icon.close}
                    size={16}
                    style={{ width: 39, height: 39, backgroundColor: '#E6EAEE' }}
                    onPress={onClose}
                />
                <CircleButton
                    icon={assets.icon.heart}
                    size={24}
                    style={{ width: 39, height: 39, backgroundColor: '#E6EAEE' }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={restaurants}
                    keyExtractor={(item) => item.placeId}
                    renderItem={({ item }) => (
                        <ModularCard
                            src={item.imageUrl ? { uri: item.imageUrl } : assets.restaurant.popeyes}
                            icon={item.type === PlaceType.Restaurant ? assets.icon.utensils_gray : assets.icon.coffee_gray}
                            iconStyle={{ width: 18, height: 21 }}
                            favorite_count={item.favoriteCount}
                        >
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.type}>{PlaceType[item.type]}</Text>
                            <View style={styles.row}>
                                <Text style={[styles.status, { color: item.isOpen ? '#F0541C' : '##0A332D' }]}>{item.isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}</Text>
                                <Image source={assets.icon.point_gray} style={{ width: 1.5, height: 1.5 }} />
                                <Text style={styles.type}>{formatDistance(latitude, longitude, item.latitude, item.longitude)}</Text>
                            </View>
                        </ModularCard>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBlock: 17 }}
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={onLoad} />
                    }
                />

                {loading && <BackgroundLoading />}
            </View>
        </View>
    )
}

export default RestaurantModal;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    name: {
        fontFamily: 'LexendMedium',
        fontSize: 14,
    },

    type: {
        fontFamily: 'LexendRegular',
        fontSize: 8,
        color: '#7A7A7A'
    },

    status: {
        fontFamily: 'LexendRegular',
        fontSize: 8
    },
})