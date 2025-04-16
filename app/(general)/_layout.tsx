import { Stack } from "expo-router";
import React from "react";

export default function GeneralStack() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"  />
            <Stack.Screen name="personalize-map" />
            <Stack.Screen name="post" />
            <Stack.Screen name="time-travel" />
            <Stack.Screen name="message" />
            <Stack.Screen name="premium" />
        </Stack>
    );
}