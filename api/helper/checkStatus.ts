import { toast } from "@/utils";
import { router } from "expo-router";

/**
 * @description: Verify network request status code
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			toast.error("Request failed! Please try again later");
			break;
		case 401:
			toast.error("Login failed! Please log in again");
			router.push("/(auth)/login");
			break;
		case 403:
			toast.error("The current account has no permission to access!");
			break;
		case 404:
			toast.error("The resource you are accessing does not exist!");
			break;
		case 405:
			toast.error("Wrong request method! Please try again later");
			break;
		case 408:
			toast.error("Request timed out! Please try again later");
			break;
		case 500:
			toast.error("Exceptional service!");
			break;
		case 502:
			toast.error("Gateway error!");
			break;
		case 503:
			toast.error("Service Unavailable!");
			break;
		case 504:
			toast.error("Gateway timeout!");
			break;
		default:
			toast.error("Request failed!");
	}
};