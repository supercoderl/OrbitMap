export interface Schedule {
    scheduleId: string;
    userId: string;
    cityId: string;
    tripDurationId: string;
    title: string;
    createdAt: Date;
    note?: string | null;
}