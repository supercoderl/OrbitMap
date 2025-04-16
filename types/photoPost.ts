import { AnnotationType } from "@/enums";

export interface PhotoPost {
    photoPostId: string;
    imageUrl: string;
    annotationType?: AnnotationType | null;
    annotationValue?: string | null;
    sentAt: Date;
    userInfo: UserInfo;
}

interface UserInfo {
    userId: string;
    fullname: string;
    avatar: string;
}

export interface Storage {
    month: number;
    photoPosts: StoragePost[];
}

export interface StoragePost {
    photoPostId: string;
    date: Date;
    imageUrl: string;
}