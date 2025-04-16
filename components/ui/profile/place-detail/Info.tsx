import { getWeather } from "@/api/modules/weather"
import { colors } from "@/constants/Colors"
import { Weather } from "@/types"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

interface InfoProps {
    lat: number;
    lon: number;
}

const Info: React.FC<InfoProps> = ({ ...props }) => {
    const { lat, lon } = props;
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onLoad = async () => {
        try {
            setLoading(true);
            const { data } = await getWeather({ lat, lon });
            if (data) setWeather(data);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, [lat, lon]);

    return (
        <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>
                The first day of the trip is most definitely the hardest as the body is not yet acclimatized to the altitude and the oxygen levels. One requires a lot of preparation mentally and physically because the increase in altitude makes one irritable and if most often...
                <Text style={styles.readMore}>Read More</Text>
            </Text>

            <Text style={styles.sectionTitle}>Weather</Text>
            <View style={styles.weatherContainer}>
                <View style={styles.weatherLeft}>
                    <View style={styles.weatherIcon}>
                        <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="orange" />
                    </View>
                    {
                        loading ? <ActivityIndicator size="large" color={colors.primary} />
                            :
                            <Text style={styles.temperature}>{weather?.temperature ?? 0}°C</Text>
                    }
                </View>
                <View style={styles.weatherRight}>
                    <View style={styles.weatherDetail}>
                        <MaterialCommunityIcons name="weather-windy" size={16} color="#4a90e2" />
                        {
                            loading ? <ActivityIndicator size="small" color={colors.primary} style={{ marginLeft: 6 }} />
                                :
                                <Text style={styles.weatherValue}>Wind {weather?.windDirection ?? ""} at {weather?.windSpeed ?? 0} km/h</Text>
                        }
                    </View>
                    <View style={styles.weatherDetail}>
                        <Ionicons name="water" size={16} color="#4a90e2" />
                        {
                            loading ? <ActivityIndicator size="small" color={colors.primary} style={{ marginLeft: 6 }} />
                                :
                                <Text style={styles.weatherValue}>{weather?.humidity ?? 0}% Humidity</Text>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Info;

const styles = StyleSheet.create({
    infoContainer: {
        paddingTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'LexendMedium',
        color: '#666',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
        marginBottom: 24,
    },
    readMore: {
        color: '#8a7cb8',
        fontFamily: 'LexendMedium'
    },
    weatherContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    weatherLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherIcon: {
        marginRight: 12,
    },
    temperature: {
        fontSize: 24,
        fontFamily: 'LexendSemiBold',
        color: '#30d4a6',
    },
    weatherRight: {
        flex: 1,
        justifyContent: 'center',
    },
    weatherDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    weatherValue: {
        fontSize: 13,
        color: '#888',
        marginLeft: 6,
    },
    poiContainer: {
        flexDirection: 'row',
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    poiItem: {
        marginRight: 12,
        alignItems: 'center',
        width: 100,
    },
    poiImage: {
        width: 100,
        height: 80,
        borderRadius: 8,
        marginBottom: 6,
    },
    poiText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
})