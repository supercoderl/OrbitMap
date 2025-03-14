import assets from "@/assets"
import PostCard from "@/components/Cards/post"
import Search from "@/components/Inputs/search"
import NavBar from "@/components/ui/NavBar"
import screen from "@/utils/screen"
import { router } from "expo-router"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const POSTS = [
    {
        id: 1,
        avatar: assets.post.thaibinh,
        name: "Báo Thái Bình",
        location: "Thái Bình",
        title: "TỪ 1/11 BẢO TÀNG LỊCH SỬ QUÂN SỰ VIỆT NAM MIỄN PHÍ VÉ",
        content: "Bảo tàng tại Nam Từ Liêm, Hà Nội, mở cửa vào 1/11 và miễn phí vé trong tháng đầu. Dự án 2.500 tỷ đồng trải rộng trên 74ha, với điểm nhấn là Tháp Chiến thắng cao 45m – tượng trưng cho năm 1945. Ngoài trưng bày lịch sử chiến tranh, bảo tàng còn mang đến trải nghiệm về cuộc đấu tranh của Quân đội Nhân dân Việt Nam.",
        images: [
            assets.post.thaibinh_1,
            assets.post.thaibinh_2,
            assets.post.thaibinh_3,
            assets.post.thaibinh_4
        ]
    },
    {
        id: 2,
        avatar: assets.post.viettrekking,
        name: "Viettrekking",
        location: "Hà Nội",
        title: "Tour leo núi Fansipan 2N1Đ (Xuất phát từ Sa Pa)",
        content: "Bảo tàng tại Nam Từ Liêm, Hà Nội, mở cửa vào 1/11 và miễn phí vé trong tháng đầu. Dự án 2.500 tỷ đồng trải rộng trên 74ha, với điểm nhấn là Tháp Chiến thắng cao 45m – tượng trưng cho năm 1945. Ngoài trưng bày lịch sử chiến tranh, bảo tàng còn mang đến trải nghiệm về cuộc đấu tranh của Quân đội Nhân dân Việt Nam.",
        images: [
            assets.post.viettrekking_1,
            assets.post.viettrekking_2,
            assets.post.viettrekking_3,
            assets.post.viettrekking_4
        ]
    }
]

export default function ForumScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <NavBar
                leftNode={
                    <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push('/(profile)')}>
                        <Image source={assets.avatar.maithy} style={styles.avatar} />
                        <View style={styles.addBtn}>
                            <Image source={assets.icon.add_black} style={styles.add} />
                        </View>
                    </TouchableOpacity>
                }
                rightNode={
                    <TouchableOpacity>
                        <Image source={assets.icon.gallery_orange} style={styles.gallery} />
                    </TouchableOpacity>
                }
                style={{ gap: 20, paddingHorizontal: 20, position: 'relative', top: 0 }}
            >
                <Search
                    placeholder="Tìm kiếm"
                />
            </NavBar>

            <Image
                source={assets.banner.forum_1}
                style={styles.banner}
                resizeMode="cover"
            />

            <FlatList
                data={POSTS}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PostCard
                        item={item}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBlock: 9, paddingHorizontal: 18, gap: 15 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'relative'
    },

    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width
    },

    addBtn: {
        width: 18,
        height: 18,
        borderRadius: screen.width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: '#FEA74E'
    },

    add: {
        width: 15,
        height: 15,
        zIndex: 3
    },

    gallery: {
        width: 28,
        height: 28
    },

    banner: {
        width: '100%',
        marginBlock: 9,
    }
})