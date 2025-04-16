import assets from "@/assets";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

const AppStack: React.FC = () => {
    return (
        <Tabs screenOptions={{
            tabBarStyle: { height: 60, paddingHorizontal: 20, backgroundColor: 'white' },
            tabBarLabelStyle: { marginBlock: 'auto' },
            tabBarIconStyle: { marginBlock: 'auto' },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
            headerShown: false
        }}>
            <Tabs.Screen
                name="forum"
                options={{
                    title: 'Forum',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? assets.icon.forum_active
                                    : assets.icon.forum_inactive
                            }
                            style={{ width: 23, height: 23 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Map',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? assets.icon.discover_active
                                    : assets.icon.discover_inactive
                            }
                            style={{ width: 23, height: 23 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="message"
                options={{
                    title: 'Message',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? assets.icon.message_active
                                    : assets.icon.message_inactive
                            }
                            style={{ width: 23, height: 23 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default AppStack;