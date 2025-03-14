import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OrbitModal from "./default"
import assets from "@/assets";
import screen from "@/utils/screen";
import { ReactNode } from "react";

interface SharingModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    height: number;
}

const OPTIONS = [
    {
        id: 1,
        name: "Tin nhắn",
        icon: assets.social.message,
        type: "message"
    },
    {
        id: 2,
        name: "Facebook",
        icon: assets.social.facebook,
        type: "facebook"
    },
    {
        id: 3,
        name: "Snapchat",
        icon: assets.social.snapchat,
        type: "snapchat"
    },
    {
        id: 4,
        name: "Instagram",
        icon: assets.social.instagram,
        type: "instagram"
    },
    {
        id: 5,
        name: "Threads",
        icon: assets.social.threads,
        type: "threads"
    },
]

const SharingModal: React.FC<SharingModalProps> = ({ ...props }) => {
    const { isOpen, onClose, children, height } = props;
    const url = "https://example.com";
    const message = "Chia sẻ nội dung này với bạn!";

    const shareToSocialMedia = async (platform: string) => {
        let shareUrl = '';

        switch (platform) {
            case 'message':
                shareUrl = `fb-messenger://share?link=${encodeURIComponent(url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'snapchat':
                shareUrl = `snapchat://send?text=${encodeURIComponent(message)}&attachmentUrl=${encodeURIComponent(url)}`;
                break;
            case 'instagram':
                shareUrl = `instagram://story-camera`; // Instagram chỉ hỗ trợ chia sẻ ảnh/video
                break;
            case 'threads':
                shareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
                break;
            default:
                Alert.alert("Không hỗ trợ nền tảng này!");
                return;
        }

        // Kiểm tra xem ứng dụng có cài đặt không
        const supported = await Linking.canOpenURL(shareUrl);
        if (supported) {
            await Linking.openURL(shareUrl);
        } else {
            Alert.alert(`Không tìm thấy ứng dụng ${platform}!`);
        }
    }

    return (
        <OrbitModal
            isOpen={isOpen}
            style={{
                overflow: 'hidden',
                top: "auto",
                bottom: 0, // Canh sát phía dưới màn hình
                height
            }}
            innerStyle={{
                alignItems: 'center',
                gap: 24,
                borderWidth: 1,
                borderColor: '#D8DADC',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
            }}
            onClose={onClose}
        >
            <Text style={{ fontFamily: 'LexendBold', fontSize: 24, color: '#020202' }}>Chia sẻ đến...</Text>
            <View style={[styles.row, { width: '100%' }]}>
                {
                    OPTIONS.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={{ alignItems: 'center', gap: 5 }}
                            onPress={() => shareToSocialMedia(item.type)}
                        >
                            <Image source={item.icon} style={{ width: 52, height: 52 }} />
                            <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 12 }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            {children}
        </OrbitModal>
    )
}

export default SharingModal;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: screen.width * 0.035
    }
})