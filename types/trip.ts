import { Schedule } from "./schedule";

export interface Trip {
    schedule: Schedule;
    dailyItineraries: DaiLyItinerary[];
}

export interface DaiLyItinerary {
    day: number;
    scheduledPlaces: SchedulePlace[];
    description: string;
}

interface SchedulePlace {
    place: PlaceInfo;
    startTime: string;
    endTime: string;
    formattedTimeSlot: string;
}

export interface PlaceInfo {
    placeId: string;
    name: string;
    address: string;
    imageUrl?: string | null;
}