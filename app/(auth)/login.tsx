import { Login } from "@/api/interface"
import { loginApi } from "@/api/modules/login"
import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import OrbitInput from "@/components/Inputs/default"
import { colors } from "@/constants/Colors"
import { toast } from "@/utils"
import screen from "@/utils/screen"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validation"
import { setRefreshToken, setToken, setUserId } from "@/redux/modules/global/action"
import { store } from "@/redux"

export default function LoginScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema),
    });

    // Log in
    const onFinish = async (loginForm: Login.ReqLoginForm) => {
        try {
            setLoading(true);
            const { data } = await loginApi(loginForm);
            store.dispatch(setToken(data?.accessToken ?? ""));
            store.dispatch(setRefreshToken(data?.refreshToken ?? ""));
            store.dispatch(setUserId(data?.userId ?? ""));
            toast.success("Login successful!");
            router.replace("/(auth)");
        } finally {
            setLoading(false);
            reset();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (errors.identifier) {
            toast.error(errors.identifier.message as string);
        }
        if (errors.password) {
            toast.error(errors.password.message as string);
        }
    }, [errors]);

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <Text style={styles.loginText}>Đăng nhập</Text>

                <View style={styles.inputWrapper}>
                    <Controller
                        control={control}
                        name="identifier"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <OrbitInput
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                autoCapitalize="none"
                                // keyboardType="numeric"
                                textContentType="telephoneNumber"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <OrbitInput
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
                                rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={value}
                                secureTextEntry={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />

                    <TouchableOpacity onPress={() => router.push('/(auth)/forgot')}>
                        <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>

                <OrbitButton
                    loading={loading}
                    text="Đăng nhập"
                    onPress={handleSubmit(onFinish)}
                />

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Bạn chưa có tài khoản?</Text>
                    <Link
                        style={[styles.forgotPassText, { marginLeft: 5, color: colors.primary }]}
                        href="/(auth)/register"
                    >
                        Đăng ký
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 160
    },

    loginText: {
        fontFamily: 'LexendBold',
        alignSelf: 'flex-start',
        fontSize: 30,
        color: colors.primary,
        marginBottom: 5,
    },

    inputWrapper: {
        marginTop: 10,
        marginBottom: 40,
        gap: 5
    },

    forgotPassText: {
        textAlign: 'right',
        fontSize: 14,
        fontFamily: 'LexendRegular',
    },

    endWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }
})