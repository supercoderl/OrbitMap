import assets from "@/assets"
import BackButton from "@/components/Buttons/back"
import OrbitButton from "@/components/Buttons/default"
import OrbitInput from "@/components/Inputs/default"
import { Link, router } from "expo-router"
import { Formik } from "formik"

import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface ResetPasswordProps {
    handleTabChange: (value: number) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ handleTabChange }) => {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <BackButton
                    buttonStyle={{ position: 'absolute', top: '10%', left: '5%' }}
                    onPress={() => handleTabChange(1)}
                />

                <Text style={styles.loginText}>Đặt lại mật khẩu</Text>
                <Text style={styles.text}>Vui lòng nhập mật khẩu mà bạn sẽ nhớ</Text>

                <Formik
                    initialValues={{
                        newPassword: '',
                        confirmNewPassword: '',
                    }}
                    onSubmit={() => router.push('/(auth)/success')}
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
                                    label="Mật khẩu mới"
                                    placeholder="Phải có ít nhất 8 kí tự"
                                    rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={values.newPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("newPassword")}
                                    onBlur={handleBlur("newPassword")}
                                />
                                <OrbitInput
                                    label="Nhập lại mật khẩu mới"
                                    placeholder="Nhập lại mật khẩu"
                                    rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={values.confirmNewPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("confirmNewPassword")}
                                    onBlur={handleBlur("confirmNewPassword")}
                                />
                            </View>

                            <OrbitButton
                                loading={false}
                                text="Đặt lại mật khẩu"
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

export default ResetPassword;

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