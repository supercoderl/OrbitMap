import BackButton from "@/components/Buttons/back";
import Horizontal from "@/components/ui/Horizontal";
import { router } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function StorageScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => router.back()}
                    buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                />
                <Text style={styles.title}>Lưu trữ</Text>
                <View style={{ width: 24 }} />
            </View>

            <Horizontal height={1} color="#D8DADC" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingBlock: 20 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                    <View style={styles.storageContainer}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>Tháng 8/2024</Text>
                        </View>
                        <View style={styles.collectionContainer}>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                        </View>
                    </View>

                    <View style={styles.storageContainer}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>Tháng 9/2024</Text>
                        </View>
                        <View style={styles.collectionContainer}>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                        </View>
                    </View>

                    <View style={styles.storageContainer}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>Tháng 10/2024</Text>
                        </View>
                        <View style={styles.collectionContainer}>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                            <View style={{ width: 32, height: 32, backgroundColor: '#D8DADC', borderRadius: 10 }}></View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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

    dateContainer: {
        backgroundColor: 'rgba(254, 167, 70, 0.7)',
        paddingBlock: 10,
        alignItems: 'center'
    },

    date: {
        fontFamily: 'LexendSemiBold',
        fontSize: 20,
        color: '#F0541C'
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