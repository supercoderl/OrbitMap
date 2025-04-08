import { FlatList, StyleSheet, View, Text, Image, RefreshControl } from "react-native"
import Search from "../Inputs/search";
import CircleButton from "../Buttons/circle-button";
import assets from "@/assets";
import ModularCard from "@/components/Cards/modular";
import StarRating from "./Star";
import { useEffect, useMemo, useState } from "react";
import { Place } from "@/types/place";
import { getPlaceList } from "@/api/modules/place";
import { PlaceType } from "@/enums";
import BackgroundLoading from "../Loading/background-loading";
import { debounce } from "lodash";

interface HotelModalProps {
    onClose: () => void;
}

const HotelModal: React.FC<HotelModalProps> = ({ ...props }) => {
    const { onClose } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [hotels, setHotels] = useState<Place[]>([]);

    const onLoad = async (text: string = "") => {
        try {
            setLoading(true);
            const { data } = await getPlaceList({
                query: { pageIndex: 1, pageSize: 10 },
                searchTerm: text,
                status: 0,
                types: [PlaceType.Hotel, PlaceType.HomeStay, PlaceType.Resort]
            });

            if (data?.items && data.items.length > 0)
                setHotels(data.items);
        }
        finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    const debouncedOnLoad = useMemo(() => debounce(onLoad, 500), []);

    const onSearch = (text: string) => {
        debouncedOnLoad(text);
    }

    useEffect(() => {
        onLoad()
    }, []);

    return (
        <>
            <View style={[styles.row, { width: '100%', gap: 10, paddingHorizontal: 20, paddingBottom: 17 }]}>
                <Search
                    placeholder="Tìm kiếm địa điểm"
                    onChangeText={onSearch}
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
                    data={hotels}
                    keyExtractor={(item) => item.placeId}
                    renderItem={({ item }) => (
                        <ModularCard
                            src={item.imageUrl ? { uri: item.imageUrl } : assets.hotel.hotel_example}
                            icon={assets.icon.hotel_gray}
                            iconStyle={{ width: 18, height: 21 }}
                            favorite_count={item.favoriteCount}
                        >
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.type}>{PlaceType[item.type]}</Text>
                            <View style={styles.row}>
                                <View style={[styles.row, { alignItems: 'baseline', gap: 3 }]}>
                                    <Text style={styles.type}>{item.rating.toFixed(1)}</Text>
                                    <StarRating rate={5} />
                                </View>
                                <Image source={assets.icon.point_gray} style={{ width: 1.5, height: 1.5 }} />
                                <Text style={styles.type}>{item.location}</Text>
                            </View>
                        </ModularCard>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBlock: 17 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={onLoad} />
                    }
                />

                {loading && <BackgroundLoading />}
            </View>
        </>
    )
}

export default HotelModal;

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
})