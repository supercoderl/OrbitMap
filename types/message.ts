// Messages
export interface Message {
    messageId: string;
    senderId: string;
    receiverId: string;
    content: string;
    mediaUrl?: string | null;
    isRead: boolean;
    createdAt: Date;
}