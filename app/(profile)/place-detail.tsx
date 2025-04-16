import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import { Place } from '@/types';
import assets from '@/assets';
import { getPlaceById } from '@/api/modules/place';
import BackgroundLoading from '@/components/Loading/background-loading';
import Info from '@/components/ui/profile/place-detail/Info';
import Stats from '@/components/ui/profile/place-detail/Stats';
import Viewer from '@/components/ui/profile/place-detail/Viewer';
import Header from '@/components/ui/profile/place-detail/Header';

export default function PlaceDetailScreen() {
    const { place } = useLocalSearchParams();
    const [placeDetail, setPlaceDetail] = useState<Place | null>(null);
    const [activeTab, setActiveTab] = useState('Info');
    const [loading, setLoading] = useState<boolean>(false);

    const tabs = ['Info', 'How to reach', 'Places to stay'];

    const renderTab = (tab: string) => (
        <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
        >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
    );

    const onLoadPlace = async (id: string) => {
        try {
            setLoading(true);
            const { data } = await getPlaceById(id);
            console.log(data);
            if (data) setPlaceDetail(data);
        }
        finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    useEffect(() => {
        const placeInfo = JSON.parse(place as string ?? "");
        if (placeInfo && placeInfo !== "") {
            onLoadPlace(placeInfo.placeId);
        }
    }, [place]);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header />

                <Image
                    source={placeDetail ? { uri: placeDetail?.imageUrl } : assets.background.orbit_point}
                    style={styles.heroImage}
                />

                <View style={styles.favoriteButton}>
                    <TouchableOpacity>
                        <Ionicons name="heart" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.title}>{placeDetail?.name}</Text>
                    <Text style={styles.location}>{placeDetail?.address}</Text>

                    <Viewer />

                    <Stats
                        placeDetail={placeDetail}
                    />

                    <View style={styles.tabContainer}>
                        {tabs.map(renderTab)}
                    </View>

                    {activeTab === 'Info' && (
                        <Info lat={placeDetail?.latitude ?? 0} lon={placeDetail?.longitude ?? 0} />
                    )}
                </View>
            </ScrollView>

            {loading && <BackgroundLoading />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    heroImage: {
        width: '100%',
        height: 280,
    },
    favoriteButton: {
        position: 'absolute',
        right: 24,
        top: 240,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#8a7cb8',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        borderWidth: 4,
        borderColor: colors.white
    },
    detailContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    location: {
        fontSize: 15,
        color: '#888',
        marginBottom: 16,
    },

    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#30d4a6',
    },
    tabText: {
        fontSize: 14,
        color: '#999',
    },
    activeTabText: {
        color: '#30d4a6',
        fontWeight: '500',
    },

});