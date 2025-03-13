import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import OrbitInput from "@/components/Inputs/default"
import screen from "@/utils/screen"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import React from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function LoginScreen() {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <Text style={styles.loginText}>Đăng nhập</Text>

                <Formik
                    initialValues={{
                        phone: '',
                        password: ''
                    }}
                    onSubmit={() => router.replace('/(home)')}
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
                                <OrbitInput
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={values.password}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                />
                                <TouchableOpacity onPress={() => router.push('/(auth)/forgot')}>
                                    <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>

                            <OrbitButton
                                loading={false}
                                text="Đăng nhập"
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Bạn chưa có tài khoản?</Text>
                    <Link
                        style={[styles.forgotPassText, { fontWeight: 'semibold', marginLeft: 5 }]}
                        href="/(auth)/register"
                    >
                        Đăng ký
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
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