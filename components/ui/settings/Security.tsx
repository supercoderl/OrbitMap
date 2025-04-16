import assets from "@/assets"
import { colors } from "@/constants/Colors";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import Horizontal from "../Horizontal";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import ChangePassword from "./security/ChangePassword";

const Security = () => {
    const pagerRef = useRef<PagerView>(null);

    const handleTabChange = (index: number) => {
        pagerRef.current?.setPage(index); // Change page when clicking on tab
    };

    return (
        <View style={{
            marginTop: 20,
            borderRadius: 10,
            zIndex: 1,
            flex: 1,
            width: '100%',
            height: '100%'
        }}>
            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
            >
                <View style={styles.page}>
                    <View key="0" style={styles.optionContainer}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Change Password</Text>
                            <TouchableOpacity style={styles.chevron_right_container} onPress={() => handleTabChange(1)}>
                                <Image source={assets.image.chevron_right} style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <Horizontal height={1} color="#D8DADC" />

                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Login Warning</Text>
                            <TouchableOpacity style={styles.chevron_right_container} onPress={() => handleTabChange(2)}>
                                <Image source={assets.image.chevron_right} style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <Horizontal height={1} color="#D8DADC" />

                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Security Check</Text>
                            <TouchableOpacity style={styles.chevron_right_container} onPress={() => handleTabChange(3)}>
                                <Image source={assets.image.chevron_right} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View key="1" style={styles.page}>
                    <View style={[styles.optionContainer, { paddingHorizontal: 15, gap: 40 }]}>
                        <ChangePassword 
                            onTabBack={() => handleTabChange(0)}
                        />
                    </View>
                </View>
                <View key="2" style={[styles.optionContainer, { paddingHorizontal: 15, paddingBlock: 15, gap: 25 }]}>
                    <Text>asdasdasd</Text>
                </View>
                <View key="3" style={[styles.optionContainer, { paddingHorizontal: 15, paddingBlock: 15, gap: 25 }]}>
                    <Text>asdasdasd</Text>
                </View>
            </PagerView>
        </View>
    )
}

export default Security;

const styles = StyleSheet.create({
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

    page: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
        paddingBlock: 10
    }
})