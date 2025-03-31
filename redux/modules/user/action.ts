import * as types from "@/redux/mutation-types";
import { User } from "@/types";

// * setUserInfo
export const setUserInfo = (userInfo: User) => ({
    type: types.SET_USER_INFO,
    userInfo
});