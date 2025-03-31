import { changePassword } from "@/api/modules/user";
import assets from "@/assets";
import OrbitButton from "@/components/Buttons/default";
import OrbitInput from "@/components/Inputs/default"
import { store } from "@/redux";
import { toast } from "@/utils";
import { changePasswordSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { View, StyleSheet, Image } from "react-native"

interface ChangePasswordProps {
    onTabBack: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ ...props }) => {
    const { onTabBack } = props;
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });
    const userId = store.getState().global?.userId;

    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (changePasswordForm: { oldPassword: string, newPassword: string }) => {
        if (!userId || userId === "") {
            toast.error("Something went wrong!", "Please re-authorize your account to continue.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await changePassword({
                ...changePasswordForm,
                userId
            });

            if (data) {
                toast.success("Success!", "Your password has been updated.");
                onTabBack();
            }
            else {
                toast.error("Something Went Wrong", "We couldn't update your password. Please try again later.");
            }
        }
        finally {
            setLoading(false);
            reset();
        }
    }

    useEffect(() => {
        if (errors.oldPassword) {
            toast.error(errors.oldPassword.message as string);
        }
        if (errors.newPassword) {
            toast.error(errors.newPassword.message as string);
        }
    }, [errors]);

    return (
        <View style={styles.inputWrapper}>
            <Controller
                control={control}
                name="oldPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <OrbitInput
                        label="Old password"
                        placeholder="Enter old password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                        secureTextEntry={true}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />

            <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <OrbitInput
                        label="New password"
                        placeholder="Enter new password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        rightIcon={<Image source={assets.image.closeEye} style={{ width: 20, height: 20 }} />}
                        secureTextEntry={true}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />

            <OrbitButton
                text="Done"
                onPress={handleSubmit(onFinish)}
                loading={loading}
            />
        </View>
    )
}

export default ChangePassword;

const styles = StyleSheet.create({
    inputWrapper: {
        marginTop: 10,
        marginBottom: 20,
        gap: 20
    },
})