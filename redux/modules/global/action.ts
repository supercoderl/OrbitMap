import * as types from "@/redux/mutation-types";
import { ThemeConfigProp } from "@/redux/interface/index";

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});

// * setToken
export const setRefreshToken = (refreshToken: string) => ({
	type: types.SET_REFRESH_TOKEN,
	refreshToken
});

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language
});

// * setThemeConfig
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
	type: types.SET_THEME_CONFIG,
	themeConfig
});

// * setUserId
export const setUserId = (userId: string) => ({
	type: types.SET_USER_ID,
	userId
});