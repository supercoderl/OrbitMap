import { User } from "@/api/interface/index";
import { User as UserInfo } from "@/types";

import http from "@/api";

/**
 * @name ChangePassword module
 */
// * User change password interface
export const changePassword = (params: User.ReqChangePasswordForm) => {
    return http.post<boolean>('User/change-password', params);
};

/**
 * @name Profile module
 */
// * User get profile interface
export const getProfile = () => {
    return http.get<UserInfo>('User/profile');
};

/**
 * @name UpdateUser module
 */
// * User update interface
export const updateUser = (params: User.UpdateUserForm) => {
    return http.put<UserInfo>('User', params);
};

/**
 * @name UpdateUserAvatar module
 */
// * User update interface
export const updateUserAvatar = (params: User.UpdateUserAvatarForm) => {
    return http.put<string>('User/change-avatar', params);
};