import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";

interface LocationSelectorModalProps {
    visible: boolean;
    onClose: () => void;
    selectedValue: string;
    onSelectLocation: (value: string) => void;
    locations: { label: string, value: string }[];
}

const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({ visible, onClose, selectedValue, onSelectLocation, locations }) => {
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        // When modal becomes visible and there's a selected item, scroll to it
        if (visible && selectedValue) {
            const selectedIndex = locations.findIndex(loc => loc.value === selectedValue);
            if (selectedIndex !== -1 && flatListRef.current) {
                // Add a small delay to ensure the modal is rendered
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index: selectedIndex,
                        animated: true,
                        viewPosition: 0.5 // centers the item
                    });
                }, 300);
            }
        }
    }, [visible, selectedValue, locations]);


    const handleLocationSelect = (value: string) => {
        if (onSelectLocation) {
            onSelectLocation(value);
        }
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Location</Text>
                <View style={styles.placeholder} />
            </View>

            <FlatList
                ref={flatListRef}
                data={locations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.locationItem, item.value === selectedValue && { backgroundColor: colors.primary }]}
                        onPress={() => handleLocationSelect(item.value)}
                        activeOpacity={0.3}
                    >
                        <View style={styles.markerContainer}>
                            <Ionicons
                                name="location-sharp"
                                size={24}
                                color="#F4AB39"
                            />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={[styles.locationName, item.value === selectedValue && { color: colors.white }]}>{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.locationsContainer}
                showsVerticalScrollIndicator={false}
            />
        </Modal>
    );
};

export default LocationSelectorModal;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    placeholder: {
        width: 28, // same as close button for centering title
    },
    locationsContainer: {
        flex: 1,
    },
    locationItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    markerContainer: {
        marginRight: 12,
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    locationAddress: {
        fontSize: 14,
        color: '#666',
    },

    // Styles for the example parent component
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    openButton: {
        backgroundColor: '#4287f5',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    openButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    selectedLocationContainer: {
        marginTop: 30,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        width: '100%',
    },
    selectedLocationTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    selectedLocationName: {
        fontSize: 16,
        fontWeight: '500',
    },
    selectedLocationAddress: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    }
});