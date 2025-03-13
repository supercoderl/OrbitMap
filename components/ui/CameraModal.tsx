import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { CameraView } from 'expo-camera';
import screen from '@/utils/screen';
import NavBar from './NavBar';
import assets from '@/assets';
import CircleButton from '../Buttons/circle-button';
import CameraOverlay from '../Overlays/camera';
import OrbitModal from '../Modals/default';
import { OPERATIONS } from '@/data';
import { TextInput } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const FRIENDS_TO_SEND = [
    {
        id: 1,
        username: "Tất cả",
        avatar: assets.avatar.all
    },
    {
        id: 2,
        username: "thaovymc1",
        avatar: assets.avatar.thaovy
    },
    {
        id: 3,
        username: "thanhthl",
        avatar: assets.avatar.thanhthu
    },
    {
        id: 4,
        username: "a_khoa03",
        avatar: assets.avatar.anhkhoa
    },
    {
        id: 5,
        username: "malthyne",
        avatar: assets.avatar.maithy
    },
    {
        id: 6,
        username: "hhuy_it",
        avatar: assets.avatar.huyhoang
    },
    {
        id: 7,
        username: "tvy",
        avatar: assets.avatar.tovy
    },
    {
        id: 8,
        username: "avac",
        avatar: assets.avatar.hung
    },
    {
        id: 9,
        username: "tvy",
        avatar: assets.avatar.tovy
    },
    {
        id: 10,
        username: "avac",
        avatar: assets.avatar.hung
    },
    {
        id: 11,
        username: "tvy",
        avatar: assets.avatar.tovy
    },
    {
        id: 12,
        username: "avac",
        avatar: assets.avatar.hung
    }
]

const overlaySize = screen.width / 1.16;

interface CameraModalProps {
    onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ ...props }) => {
    const { onClose } = props;
    const [image, setImage] = useState<string | null>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const [selectedUser, setSelectedUser] = useState<number>(FRIENDS_TO_SEND[0].id);
    const [showModal, setShowModal] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            const result = await cameraRef.current.takePictureAsync({
                quality: 1, // Chất lượng cao nhất
                base64: true, // Nếu muốn lấy base64
            });

            if (result && result.base64) {
                let base64Img = `data:image/jpeg;base64,${result.base64}`;

                setImage(base64Img);
            }
        }
    };

    return (
        <View style={styles.container}>
            <NavBar
                leftNode={
                    <View style={styles.row}>
                        <Image source={assets.avatar.maithy} style={styles.avatar} />
                        <CircleButton
                            icon={assets.icon.search_white}
                            size={15.39}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </View>
                }
                rightNode={
                    <View style={styles.row}>
                        <View style={{ position: 'relative' }}>
                            <CircleButton
                                icon={assets.icon.user_add_white}
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                            />
                            <View style={{ position: 'absolute', top: -2, right: -2, borderRadius: 50, paddingHorizontal: 4, zIndex: 2, backgroundColor: '#F0541C' }}>
                                <Text style={{ color: "white", fontSize: 10, fontFamily: "LexendSemiBold" }}>40</Text>
                            </View>
                        </View>
                        <CircleButton
                            icon={assets.icon.reload_white}
                            size={22}
                            style={{ backgroundColor: 'transparent' }}
                            onPress={() => setImage(null)}
                        />
                    </View>
                }
                style={{ top: 32 }}
            >
                <View style={{ borderWidth: 2, borderColor: 'white', borderRadius: 50, paddingHorizontal: 40, paddingBlock: 5 }}>
                    <Text style={styles.text}>
                        {image ? 'Gửi đến' : 'Bạn bè'}
                    </Text>
                </View>
            </NavBar>

            {
                image &&
                <View style={{ position: 'absolute', top: screen.width / 4.5, left: screen.width / 5, zIndex: 4, width: screen.width - screen.width / 4.5 }}>
                    <FlatList
                        data={FRIENDS_TO_SEND}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ gap: 5 }} onPress={() => setSelectedUser(item.id)}>
                                <View style={[styles.receiverContainer, { backgroundColor: selectedUser === item.id ? '#F0541C' : '#A9AAAB' }]}>
                                    <View style={styles.receiverInnerContainer}>
                                        <Image source={item.avatar} style={styles.receiverAvatar} />
                                    </View>
                                </View>
                                <Text style={[styles.receiverUsername, { color: selectedUser === item.id ? '#F0541C' : '#A9AAAB' }]}>{item.username}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 20, flexGrow: 1 }}
                        style={{ width: '100%' }}
                    />
                </View>
            }

            {
                image ?
                    <Image source={{ uri: image }} style={{ flex: 1 }} resizeMode="cover" />
                    :
                    < CameraView ref={cameraRef} style={styles.camera} />
            }

            {/* Overlay */}
            <CameraOverlay
                overlaySize={screen.width / 1.16}
                radius={40}
                borderWidth={5}
            >
                {selectedOperation === 'text' ?
                    <TextInput
                        style={{
                            paddingBlock: 5,
                            paddingHorizontal: 20,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 40,
                            fontSize: 18,
                            fontFamily: "LexendSemiBold",
                        }}
                    />
                    :
                    null}
            </CameraOverlay>

            <View style={[styles.row, { position: 'absolute', bottom: 15, width: '100%', justifyContent: 'center', gap: screen.width / 7.86 }]}>
                <TouchableOpacity onPress={onClose}>
                    <Image source={assets.icon.close_white} style={styles.close} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    image ? router.push('/(general)/post') : takePicture();
                }}>
                    <Image source={image ? assets.icon.send : assets.icon.screenshot} style={styles.screenshot} />
                </TouchableOpacity>

                {
                    image ?
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <Image source={assets.icon.save} style={styles.save} />
                        </TouchableOpacity>
                        :
                        <View />
                }
            </View>

            <OrbitModal
                isOpen={showModal}
                style={{ top: 0 }}
                innerStyle={{ top: screen.height / 1.45 }}
                showOverlay
                onClose={() => setShowModal(false)}
            >
                <Text style={{ fontFamily: 'LexendBold', fontSize: 24, color: '#020202', textAlign: 'center' }}>Chú thích</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10, paddingBlock: 20, paddingHorizontal: 30 }}>
                    {OPERATIONS.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                paddingBlock: 10,
                                paddingHorizontal: 15,
                                backgroundColor: 'rgba(10, 51, 45, 0.68)',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                borderRadius: 50
                            }}
                            onPress={() => setSelectedOperation(item.type)}
                        >
                            <Image source={item.icon} style={{ width: item.width, height: item.height }} />
                            <Text style={{ fontFamily: 'LexendRegular', fontSize: 20, color: "white" }}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </OrbitModal>
        </View>
    );
}

export default CameraModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    maskTop: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    maskRow: {
        flexDirection: "row",
    },
    maskSide: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    transparentBox: {
        width: overlaySize,
        height: overlaySize,
        borderRadius: 40,
        backgroundColor: "transparent", // Làm trong suốt
        borderWidth: 5,
        borderColor: "white", // Viền trắng
    },
    maskBottom: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
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

    text: {
        color: "white",
        fontFamily: "LexendRegular",
        fontSize: 20,
        fontWeight: '700'
    },

    close: {
        width: 34,
        height: 34
    },

    screenshot: {
        width: 80,
        height: 80
    },

    save: {
        width: 33.33,
        height: 33.33
    },

    receiverContainer: {
        borderRadius: screen.width,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center'
    },

    receiverInnerContainer: {
        borderRadius: screen.width,
        backgroundColor: "transparent",
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },

    receiverAvatar: {
        width: 30,
        height: 30,
        borderRadius: screen.width
    },

    receiverUsername: {
        fontFamily: "LexendRegular",
        fontSize: 6,
        textAlign: 'center'
    }
});
