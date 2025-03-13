import assets from "@/assets";
import React, { ReactNode } from "react"
import { Image, View, Text, StyleSheet, ImageStyle } from "react-native"

interface ModularCardProps {
    src: any,
    children: ReactNode,
    icon: any,
    favorite_count: number,
    iconStyle?: ImageStyle
}

const ModularCard: React.FC<ModularCardProps> = ({ ...props }) => {
    const { src, children, icon, favorite_count, iconStyle } = props;

    return (
        <View style={{
            backgroundColor: "white", // ✅ Bắt buộc để có shadow
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 }, // Tăng độ lệch
            shadowOpacity: 0.5, // Tăng độ mờ
            shadowRadius: 6, // Tăng bán kính bóng
            elevation: 5, // Cho Android
        }}>
            <View style={styles.container}>
                <Image source={src} style={styles.image} />
                <View style={{ flex: 1 }}>
                    {children}
                </View>
                <View style={{ alignItems: 'center', gap: 5 }}>
                    <Image source={icon} style={iconStyle} />
                    <View style={styles.favoriteContainer}>
                        <Image source={assets.icon.heart_black} style={{ width: 10, height: 10 }} />
                        <Text style={styles.favoriteText}>{favorite_count}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ModularCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },

    image: {
        width: 42,
        height: 42,
    },

    favoriteContainer: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#E6EAEE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3
    },

    favoriteText: {
        fontFamily: 'LexendRegular',
        fontSize: 8
    }
})