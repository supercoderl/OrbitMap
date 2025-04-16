import assets from '@/assets';
import BackButton from '@/components/Buttons/back';
import About from '@/components/ui/profile/detail/About';
import ActionButtons from '@/components/ui/profile/detail/ActionButtons';
import Interest from '@/components/ui/profile/detail/Interest';
import Personal from '@/components/ui/profile/detail/Personal';
import PhotoGrid from '@/components/ui/profile/detail/PhotoGrid';
import Stats from '@/components/ui/profile/detail/Stats';
import Status from '@/components/ui/profile/detail/Status';
import TabNavigator from '@/components/ui/profile/detail/TabNavigator';
import { colors } from '@/constants/Colors';
import { store } from '@/redux';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function DetailProfileScreen() {
    const { userInfo } = store.getState().user;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header with back button and menu */}
                <View style={styles.headerContainer}>
                    <BackButton
                        onPress={() => router.back()}
                        buttonStyle={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                    />
                    <TouchableOpacity>
                        <Image source={assets.icon.message_heart} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>

                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImageBorder}>
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/women/43.jpg' }}
                                style={styles.profileImage}
                            />
                        </View>
                    </View>

                    <Text style={styles.userName}>{userInfo?.fullname}</Text>
                    <Text style={styles.location}>Ha Noi</Text>
                    <Text style={styles.bio}>{ userInfo?.bio ?? "Being gay is like glitter, it never goes away."}</Text>

                    {/* Personal Details */}
                    <Personal />

                    {/* Status and Gender */}
                    <Status />

                    {/* Stats */}
                    <Stats />

                    {/* Action Buttons */}
                    <ActionButtons />

                    {/* About Section */}
                    <About />

                    {/* Interests Section */}
                    <Interest />

                    {/* Photo Tab Navigation */}
                    <TabNavigator />

                    {/* Photos Grid */}
                    <PhotoGrid />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', 
        paddingTop: 32
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: '100%'
    },

    profileContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    profileImageContainer: {
        marginTop: 10,
    },
    profileImageBorder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFD6DE',
        padding: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    bio: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});