import { LevelType } from "@/enums";

export interface UserLevel {
    userLevelId: string;
    userId: string;
    memberShipLevelId: string;
    zeafloPoint: number;
    assignedAt: Date;
    type: LevelType
}