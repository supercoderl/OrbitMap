import http from "@/api";
import { UserLevel } from "@/types";

/**
 * @name UserLevel module
 */
// * User get level interface
export const getUserLevel = () => {
    return http.get<UserLevel>('UserLevel');
};