import { getStorage } from "@/api/modules/photoPost";
import BackButton from "@/components/Buttons/back";
import BackgroundLoading from "@/components/Loading/background-loading";
import Horizontal from "@/components/ui/Horizontal";
import { colors } from "@/constants/Colors";
import { store } from "@/redux";
import { Storage } from "@/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

export default function StorageScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [storages, setStorages] = useState<Storage[]>([]);
    const { userInfo } = store.getState().user;

    const onLoad = async () => {
        try {
            setLoading(true);
            const { data } = await getStorage();
            setStorages(data ?? []);
        }
        finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Storage</Text>
                <View style={{ width: 30 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingBlock: 20 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                    {
                        storages.map((item, index) => (
                            <View style={styles.storageContainer} key={index}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.date}>Tháng {item.month}/{new Date().getFullYear()}</Text>
                                </View>
                                <View style={styles.collectionContainer}>
                                    {
                                        item.photoPosts.map((subItem, subIndex) => (
                                            <TouchableOpacity
                                                onPress={() => router.push(userInfo?.userSubscription ? { pathname: "/(general)/time-travel", params: { post: JSON.stringify(subItem) } } : '/(general)/premium')}
                                                key={subIndex}
                                            >
                                                <Image
                                                    source={{ uri: subItem.imageUrl }}
                                                    style={{ width: 32, height: 32, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>

            {loading && <BackgroundLoading />}
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

    dateContainer: {
        backgroundColor: colors.primary,
        paddingBlock: 10,
        alignItems: 'center'
    },

    date: {
        fontFamily: 'LexendSemiBold',
        fontSize: 20,
        color: colors.white
    },

    storageContainer: {
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        backgroundColor: 'white',
        elevation: 6,
    },

    collectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBlock: 10
    }
});