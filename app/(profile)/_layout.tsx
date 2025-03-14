import { Stack } from "expo-router";
import React from "react";

export default function ProfileStack() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="account-rank" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="passport" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="friend" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="closed-friend" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="storage" options={{ animation: 'slide_from_right' }} />
        </Stack>
    );
}