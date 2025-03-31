import { Visibility } from "@/enums";

export interface Post {
    postId: string;
    userId: string;
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    visibility: Visibility;
    createdAt: Date;
    author: Author;
}

interface Author {
    fullname: string;
    location: string;
    avatarUrl: string;
}