import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import OrbitInput from "@/components/Inputs/default"
import screen from "@/utils/screen"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function RegisterScreen() {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <Text style={styles.loginText}>Tạo tài khoản</Text>

                <Formik
                    initialValues={{
                        id: '',
                        name: '',
                        phone: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={() => router.push('/(auth)/phonebook')}
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
                                    label="ID"
                                    placeholder="Nhập ID duy nhất của bạn"
                                    autoCapitalize="none"
                                    value={values.id}
                                    onChangeText={handleChange("id")}
                                    onBlur={handleBlur("id")}
                                />
                                <OrbitInput
                                    label="Tên"
                                    placeholder="Nhập tên của bạn"
                                    autoCapitalize="none"
                                    value={values.name}
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                />
                                <OrbitInput
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    value={values.phone}
                                    onChangeText={handleChange("phone")}
                                    onBlur={handleBlur("phone")}
                                />
                                <OrbitInput
                                    label="Tạo mật khẩu"
                                    placeholder="Phải có ít nhất 8 kí tự"
                                    rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={values.password}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                />
                                <OrbitInput
                                    label="Nhập lại mật khẩu"
                                    placeholder="Nhập lại mật khẩu"
                                    rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={values.confirmPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                />
                            </View>

                            <OrbitButton 
                                loading={false} 
                                text="Tạo tài khoản" 
                                onPress={handleSubmit} 
                            />
                        </>
                    )}
                </Formik>

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Bạn đã có tài khoản?</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 80
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
        marginBottom: 30,
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