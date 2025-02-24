import BackButton from "@/components/Buttons/back"
import OrbitButton from "@/components/Buttons/default"
import OrbitInput from "@/components/Inputs/default"
import { Link, router } from "expo-router"
import { Formik } from "formik"

import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface InputForgotProps {
    handleTabChange: (value: number) => void;
}

const InputForgot: React.FC<InputForgotProps> = ({ handleTabChange }) => {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <BackButton
                    buttonStyle={{ position: 'absolute', top: '10%', left: '5%' }}
                    onPress={() => router.back()}
                />

                <Text style={styles.loginText}>Quên mật khẩu</Text>
                <Text style={styles.text}>Vui lòng nhập số điện thoại liên kết với tài khoản của bạn.</Text>

                <Formik
                    initialValues={{
                        phone: '',
                    }}
                    onSubmit={() => handleTabChange(1)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur
                    }) => (
                        <>
                            <View style={styles.inputWrapper}>
                                <OrbitInput
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                    textContentType="telephoneNumber"
                                    value={values.phone}
                                    onChangeText={handleChange("phone")}
                                    onBlur={handleBlur("phone")}
                                />
                            </View>

                            <OrbitButton
                                loading={false}
                                text="Gửi mã"
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Nhớ mật khẩu?</Text>
                    <Link
                        style={[styles.forgotPassText, { fontWeight: 'semibold', marginLeft: 5 }]}
                        href="/(auth)/login"
                    >
                        Đăng nhập
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default InputForgot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 160
    },

    text: {
        fontWeight: 'regular',
        fontFamily: 'Inter',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: 30
    },

    loginText: {
        fontWeight: 'bold',
        fontFamily: 'Lexend',
        alignSelf: 'flex-start',
        fontSize: 30,
        color: 'black',
        marginBottom: 5
    },

    inputWrapper: {
        marginTop: 10,
        marginBottom: 40,
        gap: 5
    },

    forgotPassText: {
        textAlign: 'right',
        fontWeight: 'regular',
        fontSize: 14,
        fontFamily: 'Inter',
    },

    endWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }
})