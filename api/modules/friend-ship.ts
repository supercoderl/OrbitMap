import http from "@/api";
import { ReqFriendListParams, ResPage } from "../interface";
import { FriendShip } from "../interface";
import { ContactInfo, FriendShip as FriendShipInfo } from "@/types";

/**
 * @name GetFriends module
 */
// * Friend interface
export const getFriendList = (params: ReqFriendListParams) => {
    return http.get<ResPage<FriendShipInfo>>('friendShip/friend', params);
};

/**
 * @name GetContacts module
 */
// * Contact interface
export const getContactList = (params: ReqFriendListParams) => {
    return http.get<ResPage<ContactInfo>>('friendShip/contact', params);
};

/**
 * @name AddFriend module
 */
// * Friend add interface
export const addFriend = (params: FriendShip.AddFriendForm) => {
    return http.post<string>('friendShip', params);
};

/**
 * @name CancelRequest module
 */
// * Cancel request interface
export const cancelRequest = (params: FriendShip.CancelForm) => {
    return http.post<boolean>('friendShip/cancel', params);
};

/**
 * @name AcceptRequest module
 */
// * Accept request interface
export const acceptRequest = (params: FriendShip.AcceptForm) => {
    return http.post<boolean>('friendShip/accept', params);
};