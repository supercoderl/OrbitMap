import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ResultData } from "@/api/interface";
import { checkStatus } from "./helper/checkStatus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { store } from "@/redux";
import { toast } from "@/utils";
import { ResultEnum } from "@/enums";
import { setRefreshToken, setToken, setUserId } from "@/redux/modules/global/action";
import qs from "qs";

const axiosCanceler = new AxiosCanceler();

const config = {
    // The default address request address can be modified in the .env file
    baseURL: process.env.EXPO_PUBLIC_API_URL as string,
    // Set the timeout period (10s)
    timeout: 10000,
    // Allowing credentials to be carried across domains
    withCredentials: true
};

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // Instantiate Axios
        this.service = axios.create(config);

        /**
         * @description request interceptor
         * Client sends request -> [Request Interceptor] -> Server
         * Token verification (JWT): accept the token returned by the server and store it in redux/async storage
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // NProgress.start();
                // * Add the current request to pending
                axiosCanceler.addPending(config);
                // * If the current request does not need to display loading, in the api service, specify the third parameter: { headers: { noLoading: true } } to control not displaying loading, see loginApi
                const token: string = store.getState().global?.token;
                const headers = new axios.AxiosHeaders({
                    ...config.headers,
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                    "ngrok-skip-browser-warning": "69420"
                });

                return { ...config, headers };
            },
            (error: AxiosError) => {
                console.log("Axios error request: ", error);
                return Promise.reject(error);
            }
        );

        /**
         * @description response interceptor
         *  The server returns the information -> [intercept and process uniformly] -> the client JS obtains the information
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response;
                // NProgress.done();
                // * After the request is completed, remove the request (close loading)
                axiosCanceler.removePending(config);
                // * Login failed (code == 599)
                if (data.code == ResultEnum.OVERDUE) {
                    store.dispatch(setToken(""));
                    store.dispatch(setRefreshToken(""));
                    toast.error(data.msg);
                    window.location.hash = "/login";
                    return Promise.reject(data);
                }
                // * Global error message interception (preventing the return of data stream when downloading files, without code, and directly reporting errors)
                if (data.code && data.code !== ResultEnum.SUCCESS) {
                    toast.error(data.msg);
                    return Promise.reject(data);
                }
                // * Successful request (no failure logic is required on the page unless there are special circumstances)
                return data;
            },
            async (error: AxiosError) => {
                const { response } = error;
                console.log("Axios error response: ", error);

                if (response?.status === 401) {
                    try {
                        // Gọi API refresh token
                        const token = store.getState().global?.refreshToken;
                        if (!token) throw new Error("No refresh token");

                        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL as string}/User/refresh`, {
                            refreshToken: token
                        });

                        const { accessToken, refreshToken, userId } = res.data;
                        store.dispatch(setToken(accessToken));
                        store.dispatch(setRefreshToken(refreshToken));
                        store.dispatch(setUserId(userId));

                        // Re-send old request with new token
                        config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
                        return this.service(config);
                    }
                    catch (refreshError) {
                        console.error("Refresh token failed", refreshError);
                        // store.dispatch(setToken(""));
                        // store.dispatch(setRefreshToken(""));
                        // store.dispatch(setUserId(""));
                        window.location.hash = "/login"; // Navigate to login
                        return Promise.reject(refreshError);
                    }
                }

                else {
                    // NProgress.done();
                    // Request timeout is determined separately, and there is no response when the request times out.
                    if (error.message.indexOf("timeout") !== -1) toast.error("The request timed out, please try again later");
                    // Do different processing according to the error status code of the response
                    if (response) checkStatus(response.status);
                    // No server results were returned (maybe server error or client disconnection) Disconnection processing: you can jump to the disconnection page
                    if (!window.navigator.onLine) window.location.hash = "/500";
                }
                return Promise.reject(error);
            }
        );
    }

    // * Common request method encapsulation
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(
            url, 
            { 
                params, 
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
                ..._object 
            }
        );
    }
    post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object);
    }
    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object);
    }
    delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object });
    }
}

export default new RequestHttp(config);