import assets from "@/assets";
import { PlaceInfo } from "@/types";
import { formatTime } from "@/utils";
import screen from "@/utils/screen";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native"

interface TripItemProps {
    position: "left" | "right";
    placeInfo: PlaceInfo;
    startTime: string;
}

const TripItem: React.FC<TripItemProps> = ({ ...props }) => {
    const { position = "left", placeInfo, startTime } = props;
    const [imageWidth, setImageWidth] = useState(0);
    const imageRef = useRef<Image>(null);

    const [hours, minutes, seconds] = startTime.split(":").map(Number);
    const dateWithTime = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hours,
        minutes,
        seconds
    );

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.measure((x, y, width, height, pageX, pageY) => {
                setImageWidth(width);  // Save image width
            });
        }
    }, []);

    return (
        <View style={styles.wrapperContainer}>
            <TouchableOpacity
                activeOpacity={0.3}
                style={[
                    styles.row,
                    { position: 'relative' },
                    position === "right" && { flexDirection: 'row-reverse' }
                ]}
                onPress={() => placeInfo.placeId !== "" && router.push({
                    pathname: "/(profile)/place-detail", params: {
                        place: JSON.stringify(placeInfo)
                    }
                })}
            >
                <Image
                    ref={imageRef}
                    source={placeInfo.imageUrl ? { uri: placeInfo.imageUrl } : assets.post.muahoa}
                    style={styles.image}
                />
                <Text style={[
                    styles.time,
                    { position: 'absolute', top: -17 },
                    position === "left" ? { left: imageWidth / 2 - 16.5 } : { right: imageWidth / 2 - 16.5 }
                ]}>
                    {formatTime(dateWithTime, "HH:mm")}
                </Text>
                <View>
                    <Text style={[
                        styles.name,
                        position === "right" && { textAlign: 'right' },
                    ]}
                    >
                        {placeInfo.name}
                    </Text>
                    <Text style={[
                        styles.address,
                        position === "right" && { textAlign: 'right' },
                    ]}
                    >
                        {placeInfo.address}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TripItem;

const styles = StyleSheet.create({
    wrapperContainer: {
        paddingTop: 30,
        paddingHorizontal: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D8DADC'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    image: {
        width: 40,
        height: 40,
        borderRadius: 8
    },

    name: {
        fontFamily: 'LexendBold',
        fontSize: 16,
    },

    address: {
        fontFamily: 'LexendMedium',
        fontSize: 15,
        maxWidth: screen.width * 0.8
    },

    time: {
        fontFamily: 'LexendBold',
        fontSize: 12,
        color: '#FEA74E'
    },
})