import http from "@/api";
import { ResPage } from "../interface";
import { Trip } from "@/types";

/**
 * @name GenerateTripHint module
 */
// * Trip interface
export const generateTripHint = (params: { cityId: string, tripDurationId: string }) => {
    return http.get<Trip>('trip', params, {});
};