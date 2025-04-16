import assets from "@/assets"
import BackButton from "@/components/Buttons/back"
import Horizontal from "@/components/ui/Horizontal"
import { colors } from "@/constants/Colors"
import { StoragePost } from "@/types"
import { requestPermission, toast } from "@/utils"
import screen from "@/utils/screen"
import { router, useLocalSearchParams } from "expo-router"
import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { nanoid } from 'nanoid/non-secure'
import * as MediaLibrary from 'expo-media-library';

export default function TimeTravelScreen() {
    const { post } = useLocalSearchParams();
    const [data, setData] = useState<StoragePost | null>(null);

    useEffect(() => {
        if (post) setData(JSON.parse(post as string));
    }, [post]);

    const onSave = async (imageUrl: string) => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        try {
            const fileUri = FileSystem.documentDirectory + `${nanoid()}.jpg`;
            const downloadRes = await FileSystem.downloadAsync(imageUrl, fileUri);
            await MediaLibrary.saveToLibraryAsync(downloadRes.uri);
            toast.info("Saving status:", "Image has been saved!");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Du hành thời gian</Text>
                <Image source={assets.icon.vip} style={{ width: 27.06, height: 22.83 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 28,
                gap: 50,
                marginTop: -50
            }}>
                <Image
                    source={data ? { uri: data.imageUrl } : assets.post.muahoa}
                    style={{
                        width: screen.width * 0.8,
                        height: screen.width * 0.8,
                        borderRadius: 40
                    }}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Image source={assets.icon.bubble_white} style={{ width: 32, height: 32 }} />
                        <Text style={styles.text}>Tùy chọn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onSave(data?.imageUrl ?? "")}>
                        <Image source={assets.icon.import_white} style={{ width: 32, height: 32 }} />
                        <Text style={styles.text}>Lưu</Text>
                    </TouchableOpacity>
                </View>
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
        color: colors.primary,
        fontFamily: "LexendBold",
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },

    text: {
        fontFamily: 'LexendSemiBold',
        fontSize: 16,
        color: "white"
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%'
    },

    button: {
        borderRadius: 40,
        paddingBlock: 6,
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.primary
    },
})