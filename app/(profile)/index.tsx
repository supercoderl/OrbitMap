import assets from "@/assets"
import BackButton from "@/components/Buttons/back"
import Horizontal from "@/components/ui/Horizontal"
import { colors } from "@/constants/Colors"
import { LevelType } from "@/enums"
import { store } from "@/redux"
import { formatDate, getZodiacSign } from "@/utils"
import screen from "@/utils/screen"
import { router } from "expo-router"
import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"

export default () => {
    const { userInfo } = store.getState().user;

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
                <View style={styles.headerContainer}>
                    <BackButton
                        onPress={() => router.back()}
                        buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                    />
                    <Text style={styles.title}>Me</Text>
                    <View style={{ width: 30 }} />
                </View>

                <Horizontal height={1} color="#D8DADC" />

                <View style={{ flex: 1, paddingBlock: 32 }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 15
                    }}>
                        <View style={{ flex: 1, gap: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image
                                    source={userInfo ? { uri: userInfo.avatarUrl } : assets.avatar.maithy}
                                    style={styles.avatar}
                                />
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push("/(profile)/detail")}>
                                    <Text style={{ fontFamily: 'LexendBold', fontSize: 20, color: colors.primary }}>
                                        {userInfo?.fullname ?? "Nomads"}
                                    </Text>
                                    <Text
                                        style={{ fontFamily: 'LexendRegular', color: '#A9AAAB' }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {userInfo?.email ?? 'nomadsdabezt@gmail.com'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={assets.icon.scan_barcode} style={{ width: 32, height: 32 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <View style={{
                                    paddingBlock: 3,
                                    borderRadius: 40,
                                    backgroundColor: '#D9D9D9',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    gap: 5
                                }}>
                                    <Image source={assets.icon.cake} style={{ width: 24, height: 24 }} />
                                    <Text style={{ fontFamily: 'LexendRegular', color: '#F0541C' }}>
                                        {formatDate(new Date(userInfo?.birthdate ?? "1997-02-24T00:00:00"), "dd MM")}
                                    </Text>
                                </View>
                                <View style={{
                                    paddingBlock: 5,
                                    borderRadius: 40,
                                    backgroundColor: '#D9D9D9',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1
                                }}>
                                    <Text style={{ fontFamily: 'LexendRegular', color: '#0A332D' }}>
                                        {getZodiacSign(new Date(userInfo?.birthdate ?? "1997-02-24T00:00:00"))}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {
                            userInfo && userInfo.qrUrl && userInfo.qrUrl !== "" ?
                                <Image source={{ uri: userInfo.qrUrl }} style={{ width: 89, height: 89, borderRadius: 5 }} />
                                :
                                <>
                                    <View style={{
                                        width: 89,
                                        height: 89,
                                        borderWidth: 1,
                                        borderColor: colors.defaultBorder,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                gap: 5,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Image source={assets.icon.reload} style={{ width: 12, height: 12 }} />
                                            <Text>Reload</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>

                    <View style={{ paddingHorizontal: 15, marginTop: 40, zIndex: 1, gap: 20 }}>
                        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/(profile)/account-rank')}>
                            <View style={styles.buttonContainer}>
                                <Image source={assets.icon.award} style={{ width: 32, height: 32 }} />
                                <Text style={styles.buttonText}>Account Rank</Text>
                                <Text style={{ fontFamily: 'LexendRegular', color: colors.primary }}>
                                    {LevelType[userInfo?.userLevel?.levelType ?? LevelType.Silver]}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionContainer}
                            onPress={() => router.push(userInfo?.userSubscription ? '/(profile)/passport' : '/(general)/premium')}
                        >
                            <View style={styles.buttonContainer}>
                                <Image source={assets.icon.personal_card} style={{ width: 32, height: 32 }} />
                                <Text style={styles.buttonText}>Certificated Passport</Text>
                                <Image source={assets.icon.vip} style={{ width: 27.06, height: 26.95 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/(profile)/friend')}>
                            <View style={styles.buttonContainer}>
                                <Image source={assets.icon.people} style={{ width: 32, height: 32 }} />
                                <Text style={styles.buttonText}>Friends</Text>
                                <Text style={{ fontFamily: 'LexendRegular', color: '#A9AAAB' }}>{userInfo?.friendsCount ?? 0}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/(profile)/closed-friend')}>
                            <View style={styles.buttonContainer}>
                                <Image source={assets.icon.two_user} style={{ width: 32, height: 32 }} />
                                <Text style={styles.buttonText}>Closed Friends</Text>
                                <Text style={{ fontFamily: 'LexendRegular', color: '#A9AAAB' }}>9</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => router.push('/(profile)/storage')}>
                            <View style={styles.buttonContainer}>
                                <Image source={assets.icon.gift} style={{ width: 32, height: 32 }} />
                                <Text style={styles.buttonText}>Storage</Text>
                                <TouchableOpacity style={styles.chevron_right_container} onPress={() => { }}>
                                    <Image source={assets.image.chevron_right} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

    chevron_right_container: {
        borderWidth: 1,
        borderColor: colors.defaultBorder,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingBlock: 8,
        borderRadius: 10
    },

    icon: {
        width: 9,
        height: 15
    },

    avatar: {
        width: 43,
        height: 43,
        borderRadius: screen.width,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBlock: 5
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
        flex: 1,
        color: colors.primary
    },

    secondText: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: '#A9AAAB'
    }
});