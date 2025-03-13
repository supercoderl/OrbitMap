import BackButton from "@/components/Buttons/back"
import OrbitButton from "@/components/Buttons/default"
import OTPInput from "@/components/Inputs/otp"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface OTPCheckingProps {
    handleTabChange: (value: number) => void;
}

const OTPChecking: React.FC<OTPCheckingProps> = ({ handleTabChange }) => {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
        >
            <View style={styles.container}>
                <BackButton
                    buttonStyle={{ position: 'absolute', top: '10%', left: '5%' }}
                    onPress={() => handleTabChange(0)}
                />

                <Text style={styles.loginText}>Kiểm tra tin nhắn SMS</Text>
                <Text style={styles.text}>Chúng tôi đã gửi mã về 094******123</Text>

                <Formik
                    initialValues={{
                        phone: '',
                    }}
                    onSubmit={() => handleTabChange(2)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur
                    }) => (
                        <>
                            <View style={styles.inputWrapper}>
                                <OTPInput length={4} />
                            </View>

                            <OrbitButton
                                loading={false}
                                text="Xác minh"
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>

                <View style={styles.endWrapper}>
                    <Text style={styles.forgotPassText}>Gửi lại mã</Text>
                    <Link
                        style={[styles.forgotPassText, { fontWeight: 'semibold', marginLeft: 5 }]}
                        href="/(auth)/login"
                    >
                        00:20
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default OTPChecking;

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