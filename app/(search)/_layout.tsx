import { Stack } from "expo-router";
import React from "react";

export default function SearchStack() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="travel-hint" options={{ animation: 'ios_from_right' }} />
        </Stack>
    );
}