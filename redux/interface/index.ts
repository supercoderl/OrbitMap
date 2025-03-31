import { FriendShip, Message, User } from "@/types";
import { Socket } from 'socket.io-client';
import * as signalR from "@microsoft/signalr";

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	mapStyle: string;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	refreshToken: string;
	userId: any;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* UserState */
export interface UserState {
	userInfo: User | null;
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}

type GroupRoom = {
	groupId: string;
};

/* ChatState */
export interface ChatState {
	socket?: Socket | null,
	signal?: signalR.HubConnection | null,
	dropped: boolean,
	friendMessages: Message[],
	friends: FriendShip[],
	friend?: FriendShip | null,
	activeRoom: (GroupRoom & FriendShip) | null
}

/* ServerRes */
export interface ServerRes {
	code: number;
	msg: string;
	data: any;
}