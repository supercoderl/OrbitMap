import { PlaceType } from "@/enums";

export interface Place {
    placeId: string;
    name: string;
    address: string;
    type: PlaceType;
    cityId: string;
    latitude: number;
    longitude: number;
    rating: number;
    reviewCount: number;
    isOpen: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
    favoriteCount: number;
    location: string;
    imageUrl?: string | null;
}