import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import assets from '@/assets';
import screen from '@/utils/screen';
import { router } from 'expo-router';
import { colors } from '@/constants/Colors';
import OrbitButton from '@/components/Buttons/default';
import LottieView from 'lottie-react-native';

export default function Premium() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Go Premium</Text>
                <Text style={styles.subtitle}>
                    Unlock all the power of this mobile tool and enjoy digital experience like never before!
                </Text>

                <View style={styles.imageContainer}>
                    <LottieView
                        loop
                        autoPlay
                        source={assets.animation.premium}
                        style={{ width: screen.width * 0.5, height: screen.width * 0.5 }}
                    />
                </View>

                <View style={styles.pricingContainer}>
                    {/* Annual Option */}
                    <TouchableOpacity style={[styles.pricingOption, styles.selectedOption]}>
                        <View style={styles.pricingHeader}>
                            <Text style={[styles.pricingTitle, { color: colors.white }]}>Annual</Text>
                            <View style={styles.bestValueBadge}>
                                <Text style={styles.bestValueText}>Best Value</Text>
                            </View>
                        </View>
                        <Text style={[styles.pricingDetails, { color: 'rgba(255, 255, 255, 0.7)' }]}>First 30 days free • Then $999/Year</Text>
                    </TouchableOpacity>

                    {/* Monthly Option */}
                    <TouchableOpacity style={styles.pricingOption}>
                        <Text style={styles.pricingTitle}>Monthly</Text>
                        <Text style={styles.pricingDetails}>First 7 days free • Then $99/Month</Text>
                    </TouchableOpacity>
                </View>

                <OrbitButton
                    text='Start 30-day free trial'
                    onPress={() => { }}
                />

                <Text style={styles.disclaimer}>
                    By placing this order, you agree to the <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'LexendBold',
        color: colors.primary,
        marginTop: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.primary,
        textAlign: 'center',
        marginTop: 8,
    },
    imageContainer: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBlock: screen.width * 0.15,
    },
    boxContainer: {
        width: 150,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    box: {
        width: 60,
        height: 50,
        backgroundColor: '#FFD700',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    percentBox: {
        width: 40,
        height: 40,
        backgroundColor: '#1560BD',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '10deg' }],
    },
    percentText: {
        color: colors.white,
        fontFamily: 'LexendBold',
        fontSize: 18,
    },
    ribbon1: {
        position: 'absolute',
        width: 50,
        height: 15,
        backgroundColor: '#FFD700',
        bottom: 30,
        right: 35,
        transform: [{ rotate: '20deg' }],
        borderRadius: 2,
    },
    ribbon2: {
        position: 'absolute',
        width: 50,
        height: 15,
        backgroundColor: '#FFD700',
        bottom: 30,
        left: 35,
        transform: [{ rotate: '-20deg' }],
        borderRadius: 2,
    },
    star1: {
        position: 'absolute',
        width: 8,
        height: 8,
        backgroundColor: '#4682B4',
        top: 30,
        right: 40,
        borderRadius: 4,
    },
    star2: {
        position: 'absolute',
        width: 8,
        height: 8,
        backgroundColor: '#4682B4',
        top: 40,
        left: 40,
        borderRadius: 4,
    },
    pricingContainer: {
        width: '100%',
        marginBottom: 24,
    },
    pricingOption: {
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    selectedOption: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    pricingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pricingTitle: {
        fontSize: 16,
        fontFamily: 'LexendBold',
        color: colors.primary,
    },
    bestValueBadge: {
        backgroundColor: '#22c55e',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    bestValueText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: 'LexendMedium'
    },
    pricingDetails: {
        marginTop: 4,
        color: '#5c77a0',
    },
    disclaimer: {
        fontSize: 12,
        color: '#5c77a0',
        textAlign: 'center',
        paddingHorizontal: 16,
        marginTop: 15
    },
    link: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});