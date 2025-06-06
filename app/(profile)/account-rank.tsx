import { getUserLevel } from "@/api/modules/user-level";
import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import OrbitButton from "@/components/Buttons/default";
import BackgroundLoading from "@/components/Loading/background-loading";
import Horizontal from "@/components/ui/Horizontal";
import { colors } from "@/constants/Colors";
import { LevelType } from "@/enums";
import { store } from "@/redux";
import { UserLevel } from "@/types";
import screen from "@/utils/screen";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, RefreshControl } from "react-native";

export default function AccountRankScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
    const { userInfo } = store.getState().user;

    const onLoad = async () => {
        if (!userInfo) return;

        try {
            setLoading(true);
            const { data } = await getUserLevel();
            setUserLevel(data as UserLevel);
        }
        finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    useEffect(() => {
        onLoad()
    }, []);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
                <View style={styles.headerContainer}>
                    <BackButton
                        onPress={() => router.back()}
                        buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                    />
                    <Text style={styles.title}>Account Rank</Text>
                    <View style={{ width: 30 }} />
                </View>

                <Horizontal height={1} color="#D8DADC" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={onLoad} />
                    }
                >
                    <View style={{ flex: 1, paddingBlock: 32, gap: 10, paddingHorizontal: 24, alignItems: 'center' }}>
                        <View style={styles.pointContainer}>
                            <Text style={styles.point}>{userLevel?.zeafloPoint ?? 0}</Text>
                        </View>

                        <Text style={{ fontFamily: 'LexendBold', fontSize: 20, }}>Your Zeaflo Point</Text>

                        <ImageBackground
                            source={assets.background.orbit_point}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: screen.height / 4.1,
                                width: '100%',
                                gap: 30
                            }}
                        >
                            <Image source={assets.icon.award_2} style={{ width: 52, height: 67 }} />
                            <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 24, color: 'white', maxWidth: '55%', textAlign: 'center' }}>
                                Zeaflo congratulates you on reaching Account {LevelType[userLevel?.type ?? LevelType.Silver]}
                            </Text>
                        </ImageBackground>

                        <Text
                            style={{ fontFamily: 'LexendRegular', fontSize: 16, color: '#A9AAAB', textAlign: 'center' }}
                        >
                            Zeaflo points increase when friends view your story, when you view their story, or when you post a story.
                        </Text>

                        <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 20, marginTop: 15 }}>Activities this month</Text>

                        <View style={{
                            paddingHorizontal: 15,
                            borderRadius: 10,
                            zIndex: 1,
                            width: '100%',
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            elevation: 10,
                        }}>
                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Story sent or viewed</Text>
                                    <Text style={{ fontFamily: 'LexendRegular', color: colors.primary, marginRight: 15 }}>38</Text>
                                </View>
                            </View>
                            <Horizontal height={1} color="#D8DADC" />

                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Story you received</Text>
                                    <Text style={{ fontFamily: 'LexendRegular', color: colors.primary, marginRight: 15 }}>22</Text>
                                </View>
                            </View>
                            <Horizontal height={1} color="#D8DADC" />

                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Number of story posts</Text>
                                    <Text style={{ fontFamily: 'LexendRegular', color: colors.primary, marginRight: 15 }}>38</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 20, marginTop: 15 }}>Member information</Text>

                        <Text
                            style={{ fontFamily: 'LexendRegular', fontSize: 16, color: '#A9AAAB', textAlign: 'center' }}
                        >
                            Number of points required to achieve Account levels. 
                            For Gold level, users need to upgrade their Account.
                        </Text>

                        <View style={{
                            paddingHorizontal: 15,
                            borderRadius: 10,
                            zIndex: 1,
                            width: '100%',
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            elevation: 10,
                        }}>
                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Member</Text>
                                    <Text style={{ fontFamily: 'LexendRegular', color: '#D8DADC', marginRight: 15 }}>0</Text>
                                </View>
                            </View>
                            <Horizontal height={1} color="#D8DADC" />

                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={[styles.buttonText, { color: colors.primary }]}>Silver</Text>
                                    <Text style={{ fontFamily: 'LexendRegular', color: colors.primary, marginRight: 15 }}>90</Text>
                                </View>
                            </View>
                            <Horizontal height={1} color="#D8DADC" />

                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={[styles.buttonText, { color: '#F0541C' }]}>Gold</Text>
                                    <Image source={assets.icon.vip} style={{ width: 24, height: 24, marginRight: 15 }} />
                                </View>
                            </View>
                            <Horizontal height={1} color="#D8DADC" />

                            <View style={styles.optionContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={[styles.buttonText, { color: '#F0541C' }]}>Diamond</Text>
                                    <Image source={assets.icon.vip} style={{ width: 24, height: 24, marginRight: 15 }} />
                                </View>
                            </View>
                        </View>

                        <OrbitButton
                            text="Nâng cấp Orbit Gold"
                            onPress={() => { }}
                            buttonStyle={{ marginTop: 10 }}
                        />
                    </View>
                </ScrollView>
            </View>
            {loading && <BackgroundLoading />}
        </>
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

    pointContainer: {
        borderWidth: 2,
        borderColor: '#D8DADC',
        borderRadius: 10,
        padding: 10
    },

    point: {
        fontFamily: 'LexendRegular',
        fontSize: 24,
        color: '#F0541C'
    },

    optionContainer: {
        paddingBlock: 12,
        gap: 10,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
    },

    secondText: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: '#A9AAAB'
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBlock: 5,
        width: '100%',
        justifyContent: 'space-between'
    },
});