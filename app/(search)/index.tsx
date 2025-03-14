import assets from "@/assets"
import Search from "@/components/Inputs/search"
import Horizontal from "@/components/ui/Horizontal"
import screen from "@/utils/screen"
import { router } from "expo-router"
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native"

const LOCATIONS = [
    {
        id: 1,
        name: "Đà Lạt",
        type: "Địa điểm",
        icon: assets.location.dalat
    },
    {
        id: 2,
        name: "Vũng Tàu",
        type: "Địa điểm",
        icon: assets.location.vungtau
    },
    {
        id: 3,
        name: "Đà Nẵng",
        type: "Địa điểm",
        icon: assets.location.danang
    },
    {
        id: 4,
        name: "Phan Thiết",
        type: "Địa điểm",
        icon: assets.location.phanthiet
    },
    {
        id: 5,
        name: "Hội An",
        type: "Địa điểm",
        icon: assets.location.hoian
    },
    {
        id: 6,
        name: "Sa Pa",
        type: "Địa điểm",
        icon: assets.location.sapa
    },
]

const FRIENDS = [
    {
        id: 1,
        name: "Khang",
        avatar: assets.avatar.khang
    },
    {
        id: 2,
        name: "Tố Vy",
        avatar: assets.avatar.tovy
    },
    {
        id: 3,
        name: "Hùng",
        avatar: assets.avatar.hung
    },
    {
        id: 4,
        name: "Tung",
        avatar: assets.avatar.tung
    }
]

export default () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <Search
                    placeholder="Tìm kiếm"
                />
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 16, color: '#F0541C' }}>Hủy</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/(search)/travel-hint')}>
                    <Image source={assets.icon.calendar} style={{ width: 42, height: 42 }} />
                    <View style={{ flex: 1, gap: 5 }}>
                        <Text style={{ fontFamily: 'LexendMedium', fontSize: 16 }}>Gợi ý kế hoạch du lịch</Text>
                        <Text style={{ fontFamily: 'LexendRegular', fontSize: 12, color: '#A9AAAB' }}>Tối ưu hoá thời gian lịch trình du lịch</Text>
                    </View>
                    <Image source={assets.icon.vip} style={{ width: 27.06, height: 26.95 }} />
                </TouchableOpacity>

                <Text style={[styles.text, { marginBlock: 15 }]}>Thêm một người bạn</Text>

                <View style={{ borderRadius: 10, zIndex: 1 }}>
                    <View style={styles.optionContainer}>
                        {
                            FRIENDS.map(item => (
                                <React.Fragment key={item.id}>
                                    <View style={styles.buttonContainer}>
                                        <Image source={item.avatar} style={{ width: 43, height: 43, borderRadius: screen.width }} />
                                        <Text style={styles.buttonText}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                            <TouchableOpacity style={{ flexDirection: 'row', gap: 5, borderRadius: 50, backgroundColor: '#FEA74E', paddingBlock: 3, paddingHorizontal: 10 }}>
                                                <Image source={assets.icon.user_add_2} style={{ width: 12.07, height: 17.14 }} />
                                                <Text style={{ fontFamily: 'LexendMedium', fontSize: 12 }}>Thêm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image source={assets.icon.close_2} style={{ width: 12, height: 12 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Horizontal height={1} color="#D8DADC" />
                                </React.Fragment>
                            ))
                        }

                        <TouchableOpacity style={{ width: '100%', alignItems: 'center', paddingBlock: 10 }}>
                            <Text style={[styles.text, { fontSize: 12 }]}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[styles.text, { marginBlock: 15 }]}>Khám phá một địa điểm</Text>

                <FlatList
                    data={LOCATIONS}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                borderRadius: 10,
                                paddingBlock: 20,
                                gap: 5
                            }}
                        >
                            <Image source={item.icon} style={{ width: 43, height: 43 }} />
                            <Text style={{ fontFamily: 'LexendMedium', fontSize: 16 }}>{item.name}</Text>
                            <Text style={{ fontFamily: 'LexendMedium', fontSize: 8, color: '#D8DADC', marginTop: 15 }}>{item.type}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 15, padding: 5 }}
                    columnWrapperStyle={{ gap: 15 }}
                />
            </View>
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

    button: {
        flexDirection: 'row',
        gap: 8,
        paddingBlock: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
        elevation: 5,
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15
    },

    text: {
        fontFamily: 'LexendMedium',
        fontSize: 16
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    optionContainer: {
        paddingBlock: 8,
        borderRadius: 10,
        gap: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1
    },
});