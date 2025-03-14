
import assets from "@/assets";
import CircleButton from "@/components/Buttons/circle-button";
import Horizontal from "@/components/ui/Horizontal";
import NavBar from "@/components/ui/NavBar";
import screen from "@/utils/screen";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MapView from "react-native-maps";
import { LinearGradient } from 'expo-linear-gradient';
import OrbitModal from "@/components/Modals/default";
import RestaurantModal from "@/components/ui/RestaurantModal";
import HotelModal from "@/components/ui/HotalModal";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import CameraModal from "@/components/ui/CameraModal";

export default () => {
    const { openModal } = useLocalSearchParams(); // Lấy query param

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"food" | "hotel" | "camera" | null>(null);

    const onShowModal = (type: "food" | "hotel" | "camera" | null) => {
        setModalType(type);
        setShowModal(true);
    }

    const onCloseModal = () => {
        setModalType(null);
        setShowModal(false);
    }

    useEffect(() => {
        if (openModal && openModal === "true") {
            setTimeout(() => onShowModal("camera"), 500);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowModal(false); // Reset modal khi rời khỏi màn hình
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <NavBar
                leftNode={
                    <CircleButton
                        icon={assets.icon.search}
                        size={15.39}
                        onPress={() => router.push('/(search)')}
                    />
                }
                children={
                    <View style={styles.location}>
                        <Text style={styles.locationText}>TP. Thủ Đức</Text>
                    </View>
                }
                rightNode={
                    <View style={styles.row}>
                        <CircleButton
                            icon={assets.icon.setting}
                            size={20}
                            onPress={() => router.push("/(settings)")}
                        />
                        <TouchableOpacity onPress={() => router.push('/(profile)')}>
                            <Image
                                source={assets.avatar.maithy}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                    </View>
                }
            />

            <View style={{ flex: 1, position: 'relative' }}>
                {/* Bản đồ */}
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 10.7769,
                        longitude: 106.7009,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    customMapStyle={[
                        {
                            "featureType": "landscape",
                            "stylers": [{ "hue": "#00ffff" }, { "saturation": -50 }]
                        }
                    ]}
                />

                {/* Lớp phủ tối ở 1/3 trên */}
                <LinearGradient
                    // Button Linear Gradient
                    colors={["rgba(40, 40, 40, 0.32)", "rgba(255, 255, 255, 0.29)", "rgba(229, 229, 229, 0)"]}
                    locations={[0, 0.7, 1]}
                    style={styles.overlay}>
                </LinearGradient>
            </View>

            <View style={[styles.row, styles.rowButton]}>
                <View style={styles.horizontalButton}>
                    <CircleButton
                        icon={assets.icon.utensils_white}
                        size={23.54}
                        style={{ backgroundColor: 'rgba(240, 84, 28, 1)' }}
                        onPress={() => onShowModal("food")}
                    />
                    <Horizontal height={2} color="rgba(169, 170, 171, 1)" />
                    <CircleButton
                        icon={assets.icon.hotel_white}
                        size={24.92}
                        style={{ backgroundColor: 'rgba(240, 84, 28, 1)' }}
                        onPress={() => onShowModal("hotel")}
                    />
                </View>
                <View style={styles.horizontalButton}>
                    <CircleButton
                        icon={assets.icon.filter_paywall}
                        size={36}
                        onPress={() => router.push('/(general)/personalize-map')}
                    />
                    <Horizontal height={2} color="rgba(169, 170, 171, 1)" />
                    <CircleButton
                        icon={assets.icon.image_picker}
                        size={41.73}
                        onPress={() => router.push('/(general)/post')}
                    />
                </View>
            </View>

            <View style={styles.addContainer}>
                <CircleButton
                    icon={assets.icon.add}
                    size={34}
                    style={styles.addButton}
                    onPress={() => onShowModal("camera")}
                />
            </View>

            <OrbitModal
                isOpen={showModal}
                style={modalType === "camera" ? {
                    top: 0
                } : {}}
                innerStyle={modalType === "camera" ? {
                    paddingBlock: 0,
                    backgroundColor: "black"
                } : {}}
                onClose={() => setShowModal(false)}
            >
                {
                    modalType === "food" ?
                        <RestaurantModal onClose={onCloseModal} /> :
                        modalType === "hotel" ?
                            <HotelModal onClose={onCloseModal} /> :
                            <CameraModal onClose={onCloseModal} />
                }
            </OrbitModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    location: {
        paddingBlock: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: 'white',
        marginLeft: 35
    },

    locationText: {
        fontFamily: 'LexendBold',
        fontSize: 20,
        textAlign: 'center'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width
    },

    addContainer: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        width: '100%'
    },

    addButton: {
        width: 68,
        height: 68,
    },

    rowButton: {
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 50
    },

    horizontalButton: {
        borderRadius: 50,
        padding: 10,
        gap: 10,
        backgroundColor: 'white'
    },

    overlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%', // 1/3 màn hình
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Màu tối mờ mờ
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