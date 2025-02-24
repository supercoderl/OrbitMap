import { Stack } from "expo-router";
import React from "react";

const AuthStack: React.FC = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="forgot" options={{ headerShown: false }} />
            <Stack.Screen name="success" options={{ headerShown: false }} />
            <Stack.Screen name="phonebook" options={{ headerShown: false }} />
            <Stack.Screen name="friend" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AuthStack;