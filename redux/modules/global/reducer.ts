import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import { produce } from "immer";
import * as types from "@/redux/mutation-types";
import { colors } from "@/constants/Colors";

const globalState: GlobalState = {
	token: "",
	refreshToken: "",
	userId: "",
	language: "",
	themeConfig: {
		// Default primary theme color
		primary: colors.primary,
		// dark mode
		isDark: false,
		// Color Weakness Mode (weak) || Gray Mode (gray)
		weakOrGray: "",
		// Theme for map
		mapStyle: ""
	}
};

// global reducer
const global = (state: GlobalState = globalState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_TOKEN:
				draftState.token = action.token;
				break;
			case types.SET_REFRESH_TOKEN:
				draftState.refreshToken = action.refreshToken;
				break;
			case types.SET_LANGUAGE:
				draftState.language = action.language;
				break;
			case types.SET_THEME_CONFIG:
				draftState.themeConfig = action.themeConfig;
				break;
			case types.SET_USER_ID:
				draftState.userId = action.userId;
				break;
			default:
				return draftState;
		}
	});

export default global;