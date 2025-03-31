import http from "@/api";

/**
 * @name UpdateUnreadMessages module
 */
// * Update unread messages interface
export const updateUnreadMessages = (params: { senderId: string, receiverId: string }) => {
    return http.put<boolean>('message/update-unread-messages', params);
};