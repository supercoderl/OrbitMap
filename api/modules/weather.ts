import http from "@/api";
import { Weather } from "@/types";

/**
 * @name GetWeather module
 */
// * Weather interface
export const getWeather = (params: { lat: number, lon: number }) => {
    return http.get<Weather>('weather', params);
};