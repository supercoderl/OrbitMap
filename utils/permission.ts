import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission required', 'App needs media library permissions to save photos');
        return false;
    }
    return true;
};