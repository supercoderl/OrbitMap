import OrbitButton from "@/components/Buttons/default"
import { colors } from "@/constants/Colors";
import { formatDate, toast } from "@/utils";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native"
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { User } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "@/utils/validation";
import { updateUser } from "@/api/modules/user";
import { router } from "expo-router";
import { store } from "@/redux";
import { setUserInfo } from "@/redux/modules/user/action";

interface EditAccountProps {
    userInfo: User | null;
}

const EditAccount: React.FC<EditAccountProps> = ({ ...props }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isChoosingDate, setIsChoosingDate] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [birthdate, setBirthdate] = useState<Date>(new Date(1997, 5, 12));
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(updateUserSchema),
    });
    const [loading, setLoading] = useState<boolean>(false);
    const { userInfo } = props;

    const setDate = (event: DateTimePickerEvent, date?: Date) => {
        const {
            type,
        } = event;

        if (type === "set" && date) {
            const localDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
            setBirthdate(localDate);
        }
        setIsChoosingDate(false);
    };

    const onFinish = async (updateForm: { fullname: string, email: string, birthdate: Date }) => {
        if (!userInfo) {
            toast.info("Authentication warning", "Please re-authenticate to continue!", 2000);
            router.push("/(auth)/login");
            return;
        }

        try {
            setLoading(true);
            var { data } = await updateUser({
                userId: userInfo.userId,
                username: userInfo.username,
                fullname: updateForm.fullname,
                email: updateForm.email,
                bio: userInfo.bio,
                avatarUrl: userInfo.avatarUrl,
                coverPhotoUrl: userInfo.coverPhotoUrl,
                phoneNumber: userInfo.phoneNumber,
                website: userInfo.website,
                location: userInfo.location,
                qrUrl: userInfo.qrUrl,
                birthdate: updateForm.birthdate,
                gender: userInfo.gender
            });

            if (data) {
                store.dispatch(setUserInfo({
                    ...userInfo,
                    ...data
                }));
                toast.success("Action complete", "Profile updated successfully!", 2000);
                setIsEditing(false);
                reset();
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ paddingHorizontal: 15, marginTop: 20, borderRadius: 10, zIndex: 1, gap: 20 }}>
            <View style={[styles.optionContainer, { paddingHorizontal: 15, paddingBlock: 15, gap: 25 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Tên</Text>
                    {
                        isEditing ?
                            <Controller
                                control={control}
                                name="fullname"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Enter your full name"
                                        style={styles.input}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                            :
                            <Text style={styles.secondText}>
                                {userInfo?.fullname ?? "Nomads"}
                            </Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>ID</Text>
                    {
                        isEditing ?
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Enter your email"
                                        style={styles.input}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                            :
                            <Text style={styles.secondText}>
                                {userInfo?.email ?? "nomadsdabezt@gmail.com"}
                            </Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Ngày sinh</Text>
                    {
                        isEditing ?
                            <Pressable onPress={() => setIsChoosingDate(true)}>
                                {
                                    isChoosingDate &&
                                    <RNDateTimePicker
                                        display="calendar"
                                        mode="date"
                                        onChange={setDate}
                                        value={birthdate}
                                        maximumDate={new Date(2099, 10, 20)}
                                        minimumDate={new Date(1950, 0, 1)}
                                        timeZoneName={'Asia/Ho_Chi_Minh'}
                                        is24Hour
                                    />
                                }

                                <TextInput
                                    placeholder={formatDate(birthdate)}
                                    style={styles.input}
                                    editable={false}
                                />
                            </Pressable>
                            :
                            <Text style={styles.secondText}>
                                {formatDate(new Date(userInfo?.birthdate ?? "1997-02-24T00:00:00"))}
                            </Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Bạn bè</Text>
                    <Text style={styles.secondText}>48</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Người dùng bị chặn</Text>
                    <Text style={styles.secondText}>0</Text>
                </View>
            </View>

            <OrbitButton
                text={isEditing ? "Xong" : "Chỉnh sửa"}
                textStyle={{ fontSize: 20 }}
                loading={loading}
                onPress={isEditing ? handleSubmit(onFinish) : () => setIsEditing(true)}
            />
        </View>
    )
}

export default EditAccount;

const styles = StyleSheet.create({
    optionContainer: {
        paddingBlock: 8,
        borderRadius: 10,
        gap: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1,
        color: colors.primary
    },

    secondText: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: '#A9AAAB'
    },

    input: {
        paddingVertical: 0,
        height: 18,
        textAlignVertical: 'center',
    }
})