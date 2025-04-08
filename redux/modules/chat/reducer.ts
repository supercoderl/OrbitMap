import { AnyAction } from "redux";
import { ChatState } from "@/redux/interface";
import { produce } from "immer";
import * as types from "@/redux/mutation-types";

const chatState: ChatState = {
    socket: null,
    signal: null,
    dropped: false,
    friendMessages: [],
    friends: [],
    friend: null,
    activeRoom: null
};

// chat reducer
const chat = (state: ChatState = chatState, action: AnyAction) =>
    produce(state, draftState => {
        switch (action.type) {
            case types.SET_SOCKET:
                draftState.socket = action.socket;
                break;
            case types.SET_SIGNAL:
                draftState.signal = action.signal;
                break;
            case types.SET_DROPPED:
                draftState.dropped = action.dropped;
                break;
            case types.ADD_FRIEND_MESSAGE:
                if (!draftState.friendMessages) {
                    draftState.friendMessages = [action.friendMessage]; // If message is empty, create new array
                } else {
                    draftState.friendMessages = [...draftState.friendMessages, action.friendMessage]; // Add new message
                }
                break;
            case types.SET_FRIEND_MESSAGES:
                    draftState.friendMessages = action.friendMessages;
                    break;
                break;
            case types.SET_FRIEND_GATHER:
                draftState.friends = action.friends;
                break;
            case types.SET_FRIEND_CHAT:
                draftState.friend = action.friend;
                break;
            case types.SET_ACTIVE_ROOM:
                draftState.activeRoom = action.activeRoom;
                break;
            case types.UPDATE_UNREAD_MESSAGES:
                const unreadMessages = draftState.friendMessages.filter(x => x.senderId === action.payload.senderId && x.receiverId === action.payload.receiverId);

                if (unreadMessages.length > 0) {
                    draftState.friendMessages = draftState.friendMessages.map(item =>
                        unreadMessages.some(msg => msg.messageId === item.messageId)
                            ? { ...item, isRead: true }
                            : item
                    );
                }
            default:
                return draftState;
        }
    });

export default chat;