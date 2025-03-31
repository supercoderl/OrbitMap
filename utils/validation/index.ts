import * as yup from "yup";

export const loginSchema = yup.object().shape({
    identifier: yup.string().min(3, "Identifier must be at least 3 characters").required("Identifider is required!"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
});

export const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().min(6, "Old password must be at least 6 characters").required("Old password is required!"),
    newPassword: yup.string().min(6, "New password must be at least 6 characters").required("New password is required!")
})

export const updateUserSchema = yup.object().shape({
    fullname: yup.string().min(6, "Fullname must be at least 6 characters").required("Fullname is required!"),
    email: yup.string().email("Email is invalid").required("Email is required!"),
    birthdate: yup.date().required("Birthdate is required!"),
})