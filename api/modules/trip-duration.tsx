import http from "@/api";
import { ReqListParams, ResPage } from "../interface";
import { TripDuration } from "@/types/tripDuration";

/**
 * @name GetTripDuration module
 */
// * Trip duration interface
export const getTripDurationList = (params: ReqListParams) => {
    return http.get<ResPage<TripDuration>>('tripDuration', params, {});
};