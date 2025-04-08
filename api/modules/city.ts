import http from "@/api";
import { ReqListParams, ResPage } from "../interface";
import { City } from "@/types";

/**
 * @name GetCity module
 */
// * City interface
export const getCityList = (params: ReqListParams) => {
    return http.get<ResPage<City>>('city', params);
};