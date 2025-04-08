import { colors } from "@/constants/Colors";
import { useRef } from "react";
import { TouchableOpacity, View, Text, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import BackgroundLoading from "../Loading/background-loading";
import { RefreshControl } from "react-native-gesture-handler";

interface SpinnerModalProps {
    showModal: boolean;
    items: { label: string, value: any, index: number }[];
    loading: boolean;
    selectedItem: any;
    onSelect: (value: any) => void;
    onCancel: () => void;
    onRefresh: () => void;
}

const SpinnerModal: React.FC<SpinnerModalProps> = ({ ...props }) => {
    const { showModal, items, selectedItem, onSelect, onCancel, loading, onRefresh } = props;
    const scrollViewRef = useRef<ScrollView | null>(null);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                        decelerationRate="normal"
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {items.map((item, index) => (
                            <Pressable
                                key={index}
                                style={[
                                    styles.item,
                                    selectedItem === item.value && styles.selectedItem
                                ]}
                                onPress={() => {
                                    scrollViewRef.current?.scrollTo({
                                        y: item.index * 40, // Approximate height of each item
                                        animated: true,
                                    });
                                    onSelect(item.value);
                                    onCancel();
                                }}
                            >
                                <Text
                                    style={[
                                        styles.itemText,
                                        selectedItem === item.value ? styles.selectedItemText : styles.unselectedItemText
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onCancel}
                    >
                        <Text style={[styles.cancelText, { color: colors.black }]}>Cancel</Text>
                    </TouchableOpacity>
                    {loading && <BackgroundLoading />}
                </View>
            </View>
        </Modal>
    );
}

export default SpinnerModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        maxHeight: '70%', // Limit the height to allow scrolling
    },
    scrollView: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        maxHeight: 250, // Set a fixed height for the scroll view
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    item: {
        padding: 15,
        justifyContent: 'center',
    },
    selectedItem: {
        backgroundColor: '#f0f0f0',
    },
    itemText: {
        fontSize: 18,
        textAlign: 'center',
    },
    selectedItemText: {
        color: '#000',
        fontWeight: 'bold',
    },
    unselectedItemText: {
        color: '#aaa',
        fontWeight: 'normal',
    },
    cancelButton: {
        padding: 15,
    },
    cancelText: {
        color: '#2196F3',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});