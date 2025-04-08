import http from "@/api";
import { ReqPlaceListParams, ResPage } from "../interface";
import { Place } from "@/types/place";

/**
 * @name GetPlace module
 */
// * Place interface
export const getPlaceList = (params: ReqPlaceListParams) => {
    return http.get<ResPage<Place>>('place', params, {});
};