import { FriendShip, Message } from "@/types";

export const getMessage = (messages: Message[], item: FriendShip, userId?: string | null) => {
    // Count unread message
    let messageCount = 0;

    // Fitler messages in Redux state for 2 people
    const userMessages = messages.filter(msg =>
        (msg.senderId === userId && msg.receiverId === item.info.friendId) ||
        (msg.senderId === item.info.friendId && msg.receiverId === userId)
    );

    // Count unread messages in Redux state
    const unreadReduxMessages = userMessages.filter(msg => msg.isRead === false).length;

    // Count unread messages in item.messages (if exists)
    const unreadItemMessages = item.messages?.filter(msg => msg.isRead === false).length ?? 0;

    // Total unread messages
    messageCount = unreadReduxMessages + unreadItemMessages;

    // Get latest message from Redux or item.messages
    const latestReduxMessage = userMessages.length > 0
        ? userMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        : null;

    const latestMessage = latestReduxMessage ||
        (item.messages && item.messages.length > 0
            ? [...item.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
            : null);

    return {
        senderId: latestMessage?.senderId ?? "",
        content: latestMessage?.content ?? "",
        unreadMessageCount: messageCount
    }
};