import { ReactionType, Visibility } from "@/enums";

export interface Post {
    postId: string;
    userId: string;
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    visibility: Visibility;
    createdAt: Date;
    author: Author;
    userReactions: UserReactions[];
}

interface Author {
    fullname: string;
    location: string;
    avatarUrl: string;
}

interface UserReactions {
    userId: string;
    reactionType: ReactionType;
}