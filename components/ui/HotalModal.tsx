import { FlatList, StyleSheet, View, Text, Image } from "react-native"
import Search from "../Inputs/search";
import CircleButton from "../Buttons/circle-button";
import assets from "@/assets";
import ModularCard from "@/components/Cards/modular";
import StarRating from "./Star";

const HOTELS = [
    {
        id: 1,
        name: "De’Pie Little Maison",
        type: "Homestay",
        rate: 5,
        location: "Hồ Chí Minh",
        favorite_count: 63,
        image: assets.hotel.hotel_example
    },
    {
        id: 2,
        name: "Lâm Viên Garden & Homestay",
        type: "Homestay",
        rate: 4.8,
        location: "Đà Lạt",
        favorite_count: 40,
        image: assets.hotel.hotel_example
    },
    {
        id: 3,
        name: "Meliá Ho Tram Beach Resort",
        type: "Resort",
        rate: 4.7,
        location: "Hồ Tràm",
        favorite_count: 60,
        image: assets.hotel.hotel_example
    },
    {
        id: 4,
        name: "SOJO Hotels",
        type: "Khách sạn",
        rate: 4.5,
        location: "Hà Nội",
        favorite_count: 66,
        image: assets.hotel.hotel_example
    },
    {
        id: 5,
        name: "Khách sạn Capella",
        type: "Khách sạn",
        rate: 4.8,
        location: "Hà Nội",
        favorite_count: 84,
        image: assets.hotel.hotel_example
    },
    {
        id: 6,
        name: "Khách sạn Imperial",
        type: "Khách sạn",
        rate: 4.5,
        location: "Vũng Tàu",
        favorite_count: 48,
        image: assets.hotel.hotel_example
    },
    {
        id: 7,
        name: "Khách sạn Novotel",
        type: "Khách sạn",
        rate: 4.6,
        location: "Đà Nẵng",
        favorite_count: 68,
        image: assets.hotel.hotel_example
    },
    {
        id: 8,
        name: "Củi Homestay",
        type: "Homestay",
        rate: 4.3,
        location: "Đà Lạt",
        favorite_count: 44,
        image: assets.hotel.hotel_example
    },
    {
        id: 9,
        name: "Khu Nghỉ dưỡng Amanoi",
        type: "Resort",
        rate: 4.7,
        location: "Ninh Thuận",
        favorite_count: 86,
        image: assets.hotel.hotel_example
    },
    {
        id: 10,
        name: "Khách sạn Bạch Kim",
        type: "Khách sạn",
        rate: 4.7,
        location: "Cần Thơ",
        favorite_count: 88,
        image: assets.hotel.hotel_example
    }
]

interface HotelModalProps {
    onClose: () => void;
}

const HotelModal: React.FC<HotelModalProps> = ({ ...props }) => {
    const { onClose } = props;

    return (
        <>
            <View style={[styles.row, { width: '100%', gap: 10, paddingHorizontal: 20, paddingBottom: 17 }]}>
                <Search
                    placeholder="Tìm kiếm địa điểm"
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
            <FlatList
                data={HOTELS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ModularCard
                        src={item.image}
                        icon={assets.icon.hotel_gray}
                        iconStyle={{ width: 18, height: 21 }}
                        favorite_count={item.favorite_count}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.type}>{item.type}</Text>
                        <View style={styles.row}>
                            <View style={[styles.row, { alignItems: 'baseline', gap: 3 }]}>
                                <Text style={styles.type}>{item.rate.toFixed(1)}</Text>
                                <StarRating rate={item.rate} />
                            </View>
                            <Image source={assets.icon.point_gray} style={{ width: 1.5, height: 1.5 }} />
                            <Text style={styles.type}>{item.location}</Text>
                        </View>
                    </ModularCard>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBlock: 17 }}
            />
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
        fontFamily: 'Lexend',
        fontSize: 14,
        fontWeight: 'medium'
    },

    type: {
        fontFamily: 'Lexend',
        fontSize: 8,
        color: '#7A7A7A'
    },
})