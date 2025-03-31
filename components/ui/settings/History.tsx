import assets from "@/assets";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Horizontal from "../Horizontal";
import OrbitButton from "@/components/Buttons/default";
import OrbitModal from "@/components/Modals/default";
import { useState } from "react";
import { colors } from "@/constants/Colors";

const History = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <View style={{ paddingHorizontal: 15, borderRadius: 10, zIndex: 1, alignItems: 'center' }}>
                <Text style={styles.description}>Xem lại và quản lý lích sử tìm kiếm của bạn trên Orbit. Chỉ bạn mới nhìn thấy nội dung mình đã tìm kiếm.</Text>

                <View style={{ marginTop: 12, marginBottom: 8, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'LexendMedium', fontSize: 16 }}>Mới nhất đến cũ nhất</Text>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: 'LexendMedium', fontSize: 16, color: colors.primary }}>Sắp xếp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Nodmas</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>sự kiện du lịch</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Khách sạn Vũng Tàu</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Haidilao Landmark 81</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Suối Tiên</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Quán ăn Phú Nhuận</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Homestay Phan Thiết</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>VIỆT NAM-Nơi tôi sống</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <Horizontal height={1} color="#D8DADC" />

                    <View style={styles.buttonContainer}>
                        <Image source={assets.icon.search} style={styles.search} />
                        <Text style={styles.buttonText}>Quán cà phê đẹp Đà Lạt</Text>
                        <TouchableOpacity>
                            <Image source={assets.icon.close_2} style={styles.close} />
                        </TouchableOpacity>
                    </View>
                </View>

                <OrbitButton
                    text="Xoá tất cả lịch sử tìm kiếm"
                    onPress={() => setShowModal(true)}
                    buttonStyle={{ marginTop: 15 }}
                    textStyle={{ fontSize: 20 }}
                />
            </View>
            {/* <OrbitModal
                isOpen={showModal}
                showOverlay
                overlayBackground="white"
                onClose={() => setShowModal(false)}
                style={{ zIndex: 12, top: 124 }}
            >
                <Text>Hello</Text>
            </OrbitModal> */}
        </>
    )
}

export default History;

const styles = StyleSheet.create({
    description: {
        fontFamily: 'LexendRegular',
        fontSize: 16,
        color: '#A9AAAB',
        textAlign: 'center',
        maxWidth: '90%'
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
        width: '100%',
        zIndex: 1
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBlock: 5,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1
    },

    search: {
        width: 20,
        height: 20
    },

    secondText: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: '#A9AAAB'
    },

    close: {
        width: 12,
        height: 12
    }
})