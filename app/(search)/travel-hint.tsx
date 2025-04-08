import { getCityList } from "@/api/modules/city";
import { generateTripHint } from "@/api/modules/trip";
import { getTripDurationList } from "@/api/modules/trip-duration";
import assets from "@/assets";
import BackButton from "@/components/Buttons/back";
import OrbitButton from "@/components/Buttons/default";
import Search from "@/components/Inputs/search";
import BackgroundLoading from "@/components/Loading/background-loading";
import LocationSelectorModal from "@/components/Modals/location";
import SpinnerModal from "@/components/Modals/spinner";
import Empty from "@/components/ui/Empty";
import Horizontal from "@/components/ui/Horizontal";
import TripItem from "@/components/ui/trip-hint/Item";
import { colors } from "@/constants/Colors";
import { ActionStatus } from "@/enums";
import { City, Trip } from "@/types";
import { formatDailyItineraries, get_storage_data } from "@/utils";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function TravelHint() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
    const [selectedDuration, setSelectedDuration] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const pagerRef = useRef<PagerView>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [tripHint, setTripHint] = useState<Trip | null>(null);
    const [durations, setDurations] = useState<{ label: string, value: string, index: number }[]>([]);
    const [locations, setLocations] = useState<{ label: string, value: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [durationLoading, setDurationLoading] = useState<boolean>(false);
    const [todalPage, setTotalPage] = useState<number>(0);

    const handleTabChange = (index: number) => {
        if (pagerRef.current) {
            setPageIndex(index);
            pagerRef.current.setPage(index);
        } else {
            console.warn("PagerView chưa mount, không thể chuyển trang.");
        }
    };

    const onGenerateTripHint = async () => {
        try {
            setLoading(true);
            const { data } = await generateTripHint({ cityId: selectedCity, tripDurationId: selectedDuration });
            if (data) {
                setTripHint(data);
                setTotalPage(data.dailyItineraries?.length ?? 0);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    const onLoadDuration = async () => {
        try {
            setDurationLoading(true);
            const { data } = await getTripDurationList({
                query: { pageIndex: 1, pageSize: 10 },
                searchTerm: "",
                status: ActionStatus.All
            });

            if (data && data.items.length > 0) {
                setDurations(data.items.map((item, index) => ({ label: item.label, value: item.tripDurationId, index })));
                setSelectedDuration(data.items[0].tripDurationId);
            }
        }
        finally {
            setDurationLoading(false);
        }
    };

    const onLoadLocation = async () => {
        try {
            setLoading(true);
            var locations = await get_storage_data("cities");

            if (!locations) {
                const { data } = await getCityList({
                    query: { pageSize: 63, pageIndex: 1 },
                    searchTerm: "",
                    status: ActionStatus.All
                });

                if (data && data.items.length > 0) {
                    locations = data.items;
                }
            }

            setLocations(locations.map((item: City) => ({ label: item.name, value: item.cityId })));
            setSelectedCity(locations[0].cityId);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoadDuration();
        onLoadLocation();
    }, []);

    useEffect(() => {
        if (selectedCity && selectedDuration) {
            onGenerateTripHint();
        }
    }, [selectedDuration, selectedCity]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Gợi ý kế hoạch du lịch</Text>
                <Image source={assets.icon.vip} style={{ width: 27.06, height: 26.95 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <View style={[styles.row, { padding: 15 }]}>
                <View style={{ position: 'relative', flex: 1, height: 40 }}>
                    <Search
                        icon={assets.icon.discover_inactive}
                        value={locations.find(item => item.value === selectedCity)?.label ?? ""}
                        editable={false}
                        items={[]}
                        onChangeText={() => { }}
                    />
                    <Pressable
                        onPress={() => setShowLocationModal(true)}
                        style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}
                    />
                </View>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text style={{ fontFamily: 'LexendSemiBold', fontSize: 16, color: '#F0541C' }}>3N2D</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                {
                    tripHint ?
                        <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0} scrollEnabled={false}>
                            {
                                tripHint && formatDailyItineraries(tripHint.dailyItineraries).map((item, index) => (
                                    <View key={index} style={{ flex: 1 }}>
                                        <View style={{ flex: 1, paddingBlock: 10 }}>
                                            <ScrollView style={{ flex: 1 }}>
                                                {item.scheduledPlaces.map((schedulePlace, index) => (
                                                    <View key={index}>
                                                        {
                                                            index % 2 === 0 ?
                                                                <TripItem
                                                                    placeInfo={schedulePlace.place}
                                                                    position="left"
                                                                    startTime={schedulePlace.startTime}
                                                                />
                                                                :
                                                                <TripItem
                                                                    placeInfo={schedulePlace.place}
                                                                    position="right"
                                                                    startTime={schedulePlace.startTime}
                                                                />
                                                        }
                                                    </View>
                                                ))}
                                            </ScrollView>
                                            <View style={styles.pagination}>
                                                <View>
                                                    {/* Only show "previous" if not on first page */}
                                                    {index > 0 ? (
                                                        <TouchableOpacity
                                                            style={styles.paginationButton}
                                                            onPress={() => handleTabChange(index - 1)}
                                                        >
                                                            <Image
                                                                source={assets.image.chevron_left}
                                                                style={styles.paginationButtonIcon}
                                                            />
                                                        </TouchableOpacity>
                                                    ) : <View style={{ width: 6.92307710647583 }} />}
                                                </View>
                                                <Text style={styles.paginationText}>Day {item.day}</Text>
                                                <View>
                                                    {/* Only show "next" if not on last page */}
                                                    {index < tripHint.dailyItineraries.length - 1 ? (
                                                        <TouchableOpacity
                                                            style={styles.paginationButton}
                                                            onPress={() => handleTabChange(index + 1)}
                                                        >
                                                            <Image
                                                                source={assets.image.chevron_right}
                                                                style={styles.paginationButtonIcon}
                                                            />
                                                        </TouchableOpacity>
                                                    ) : <View style={{ width: 6.92307710647583 }} />}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                        </PagerView>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15 }}>
                            <Empty />

                            <OrbitButton
                                onPress={() => { }}
                                text="Try again"
                            />
                        </View>
                }
                {loading && <BackgroundLoading />}
            </View>

            <SpinnerModal
                showModal={showModal}
                items={durations}
                loading={durationLoading}
                selectedItem={selectedDuration}
                onSelect={setSelectedDuration}
                onCancel={() => setShowModal(false)}
                onRefresh={onLoadDuration}
            />

            <LocationSelectorModal
                visible={showLocationModal}
                onClose={() => setShowLocationModal(false)}
                onSelectLocation={(value) => setSelectedCity(value)}
                selectedValue={selectedCity}
                locations={locations}
            />
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
        color: "#292D32",
        fontFamily: "LexendBold",
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 15
    },

    paginationText: {
        flex: 1,
        fontFamily: 'LexendBold',
        color: colors.primary,
        fontSize: 20,
        textAlign: 'center'
    },

    paginationButton: {
        width: 30,
        height: 30,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#D8DADC',
        alignItems: 'center',
        justifyContent: 'center'
    },

    paginationButtonIcon: {
        width: 6.92307710647583,
        height: 11.538461685180664
    },
})