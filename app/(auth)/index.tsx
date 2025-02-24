import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default () => {
    useEffect(() => {
        setTimeout(() => router.push('/(auth)/welcome'), 300);
    }, []);

    return <View />;
};