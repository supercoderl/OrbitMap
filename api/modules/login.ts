import { Login } from "@/api/interface/index";

import http from "@/api";

/**
 * @name Login module
 */
// * User login interface
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>('User/login', params);
	return http.post<Login.ResLogin>('User/login', {}, { params }); // Post request carries query parameter  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>('User/login', qs.stringify(params)); // Post request carries form parameters  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>('User/login', params, { headers: { noLoading: true } }); // Control the current request not to display loading
};