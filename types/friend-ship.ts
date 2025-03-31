import { FriendShipStatus } from "@/enums";
import { Message } from "./message";

export interface FriendShip {
    friendShipId: string;
    userId: string;
    createdAt: Date;
    info: ContactInfo;
    messages?: Message[] | null;
}

export interface ContactInfo {
    friendId: string;
    username: string;
    fullname: string;
    avatarUrl: string;
    status: FriendShipStatus;
}