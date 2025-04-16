import { Gender, LevelType, ReactionType } from "@/enums";

export interface User {
    userId: string;
    username: string;
    email: string;
    fullname: string;
    bio?: string | null;
    avatarUrl: string;
    coverPhotoUrl: string;
    phoneNumber: string;
    website?: string | null;
    location?: string | null;
    qrUrl: string;
    birthdate: Date;
    gender: Gender;
    createdAt: Date;
    updatedAt?: Date | null;
    friendsCount: number;
    postReactions: { postId: string, reactionType: ReactionType }[];
    savePosts: { postId: string }[];
    userLevel?: { levelType: LevelType, zeafloPoint: number };
    userSubscription?: { planName: string, startDate: Date, endDate?: Date | null }
}