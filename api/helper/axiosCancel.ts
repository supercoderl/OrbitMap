import axios, { AxiosRequestConfig, Canceler } from "axios";
import { isFunction } from "@/utils/is/index";
import qs from "qs";

// * Declare a Map to store the identifier and cancellation function of each request
let pendingMap = new Map<string, Canceler>();

// * Serialization parameters
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler {
	/**
	 * @description: Add request
	 * @param {Object} config
	 */
	addPending(config: AxiosRequestConfig) {
		// * Before the request starts, check and cancel the previous request
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pendingMap.has(url)) {
					// If the current request does not exist in pending, add it
					pendingMap.set(url, cancel);
				}
			});
	}

	/**
	 * @description: removal request
	 * @param {Object} config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);

		if (pendingMap.has(url)) {
			// If there is a current request ID in pending, you need to cancel the current request and remove
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}

	/**
	 * @description: Clear all pending
	 */
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel();
		});
		pendingMap.clear();
	}

	/**
	 * @description: reset
	 */
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}
}