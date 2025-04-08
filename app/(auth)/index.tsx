import { getProfile } from '@/api/modules/user';
import assets from '@/assets';
import { colors } from '@/constants/Colors';
import { store } from '@/redux';
import { chatService } from '@/redux/modules/chat/action';
import { setUserInfo } from '@/redux/modules/user/action';
import { toast } from '@/utils';
import screen from '@/utils/screen';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';

export default () => {
    const [loading, setLoading] = useState<boolean>(false);
    const token = store.getState().global?.token;

    useEffect(() => {
        setTimeout(() => {
            if (token) {
                fetchUserInformation();
                return;
            }
            router.push('/(auth)/welcome');
        }, 300);
    }, [token]);

    const fetchUserInformation = async () => {
        try {
            setLoading(true);
            const { data } = await getProfile();
            if (data) {
                store.dispatch(setUserInfo(data));
                router.push('/(home)');
                chatService.connectSocket(token, data.userId);
            }
            else {
                toast.error("Something went wrong", "User data null, please re-authorize!");
                router.replace('/(auth)/login');
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={assets.image.logo} style={styles.logo} />
            {
                loading &&
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color={colors.defaultBorder} />
                    <Text style={styles.text}>Fetching information, please wait!</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },

    logo: {
        height: screen.width / 2,
        objectFit: "contain",
    },

    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.defaultBorder,
    },
});