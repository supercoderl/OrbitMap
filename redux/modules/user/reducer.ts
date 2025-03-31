import { AnyAction } from "redux";
import { produce } from "immer";
import * as types from "@/redux/mutation-types";
import { UserState } from "@/redux/interface";

const userState: UserState = {
	userInfo: null
};

// user reducer
const user = (state: UserState = userState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_USER_INFO:
				draftState.userInfo = action.userInfo;
				break;
			default:
				return draftState;
		}
	});

export default user;