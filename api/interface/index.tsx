import { ActionStatus, FriendShipStatus, Gender } from "@/enums";

// * Request response parameters (excluding data)
export interface Result {
	code: string;
	msg: string;
}

// * Request response parameters (including data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * Pagination response parameters
export interface ResPage<T> {
	items: T[];
	pageIndex: number;
	pageSize: number;
	count: number;
}

// * Pagination request parameters
export interface ReqPage {
	pageIndex: number;
	pageSize: number;
}

// * List request parameters (including filter, sort, search, status, pagination)
export interface ReqListParams {
	query: ReqPage;
	searchTerm: string;
	status: ActionStatus;
	sortQuery?: any;
}

// * List request parameters (including filter, user id, search, status, pagination)
export interface ReqFriendListParams {
	query: ReqPage;
	searchTerm: string;
	actionType: string;
	status: ActionStatus;
	userId?: string | null;
}

// * Log in
export namespace Login {
	export interface ReqLoginForm {
		identifier: string;
		password: string;
	}
	export interface ResLogin {
		accessToken: string;
        expiredTime: number;
        refreshToken: string;
        userId: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

// * User
export namespace User {
	export interface ReqChangePasswordForm {
		userId: string;
		oldPassword: string;
		newPassword: string;
	}

	export interface UpdateUserForm {
		userId: string;
		username: string;
		email: string;
		fullname: string;
		bio?: string | null;
		avatarUrl: string;
		coverPhotoUrl: string;
		phoneNumber: string;
		website?: string | null;
		location?: string | null;
		qrUrl: string;
		birthdate: Date;
		gender: Gender;
	}
}

// * Friend Ship
export namespace FriendShip {
	export interface AddFriendForm {
		userId: string;
		friendId: string;
	}

	export interface CancelForm {
		friendShipId?: string | null;
		userId?: string | null;
		friendId?: string | null;
	}

	export interface AcceptForm {
		friendShipId: string;
	}
}