import { FlatList, StyleSheet, View, Text, Image } from "react-native"
import Search from "../Inputs/search";
import CircleButton from "../Buttons/circle-button";
import assets from "@/assets";
import ModularCard from "@/components/Cards/modular";

const RESTAURANTS = [
    {
        id: 1,
        name: "Nhà hàng Baoz Dimsum",
        type: "Nhà hàng",
        status: 1,
        distance: 20,
        favorite_count: 70,
        image: assets.restaurant.baoz
    },
    {
        id: 2,
        name: "Pizza 4P’s Xuan Thuy",
        type: "Nhà hàng",
        status: 1,
        distance: 12,
        favorite_count: 40,
        image: assets.restaurant.fourp
    },
    {
        id: 3,
        name: "Haidilao",
        type: "Nhà hàng Lẩu",
        status: 1,
        distance: 13,
        favorite_count: 60,
        image: assets.restaurant.hailidao
    },
    {
        id: 4,
        name: "Work’s Pied",
        type: "Cà phê",
        status: 1,
        distance: 18,
        favorite_count: 34,
        image: assets.restaurant.pied
    },
    {
        id: 5,
        name: "KANA Coffee",
        type: "Cà phê",
        status: 1,
        distance: 34,
        favorite_count: 68,
        image: assets.restaurant.kana
    },
    {
        id: 6,
        name: "Tiệm Cơm Cô Út",
        type: "Nhà hàng",
        status: 0,
        distance: 0.2,
        favorite_count: 39,
        image: assets.restaurant.cout
    },
    {
        id: 7,
        name: "Cơm Nêu Sài Gòn",
        type: "Nhà hàng",
        status: 1,
        distance: 4,
        favorite_count: 55,
        image: assets.restaurant.comnieu
    },
    {
        id: 8,
        name: "Bamos Coffee",
        type: "Cà phê",
        status: 1,
        distance: 5,
        favorite_count: 24,
        image: assets.restaurant.bamos
    },
    {
        id: 9,
        name: "Chicken Plus",
        type: "Nhà hàng",
        status: 0,
        distance: 1.1,
        favorite_count: 78,
        image: assets.restaurant.plus
    },
    {
        id: 10,
        name: "Gà Rán Popeyes",
        type: "Nhà hàng",
        status: 0,
        distance: 23,
        favorite_count: 29,
        image: assets.restaurant.popeyes
    }
]

interface RestaurantModalProps {
    onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ ...props }) => {
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
                data={RESTAURANTS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ModularCard
                        src={item.image}
                        icon={assets.icon.utensils_gray}
                        iconStyle={{ width: 18, height: 21 }}
                        favorite_count={item.favorite_count}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.type}>{item.type}</Text>
                        <View style={styles.row}>
                            <Text style={[styles.status, { color: item.status === 1 ? '#F0541C' : '##0A332D' }]}>{item.status === 1 ? 'Đang mở cửa' : 'Đã đóng cửa'}</Text>
                            <Image source={assets.icon.point_gray} style={{ width: 1.5, height: 1.5 }} />
                            <Text style={styles.type}>{item.distance < 1 ? `${item.distance * 1000} m` : `${item.distance} km`}</Text>
                        </View>
                    </ModularCard>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBlock: 17 }}
            />
        </>
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