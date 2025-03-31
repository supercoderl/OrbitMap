import http from "@/api";
import { ReqListParams, ResPage } from "../interface";
import { MapTheme } from "@/types/map-theme";

/**
 * @name GetMapTheme module
 */
// * MapTheme interface
export const getMapThemeList = (params: ReqListParams) => {
    return http.get<ResPage<MapTheme>>('mapTheme', params);
};