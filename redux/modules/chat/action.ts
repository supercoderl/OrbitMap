import * as types from "@/redux/mutation-types";
import { ServerRes } from "@/redux/interface/index";
import { Socket } from "socket.io-client";
import * as signalR from "@microsoft/signalr";
import { socketUrl } from "@/api/config";
import { store } from "@/redux";
import { FriendShip, Message } from "@/types";
import { toast } from "@/utils";

// * setSocket
export const setSocket = (socket: Socket | null) => ({
    type: types.SET_SOCKET,
    socket
});

// * setSignal
export const setSignal = (signal: signalR.HubConnection | null) => ({
    type: types.SET_SIGNAL,
    signal
});

// * setDropped
export const setDropped = (dropped: boolean) => ({
    type: types.SET_DROPPED,
    dropped
});

// * addFriendMessage
export const addFriendMessage = (friendMessage: Message) => ({
    type: types.ADD_FRIEND_MESSAGE,
    friendMessage
})

// * setFriendGather
export const setFriendGather = (friends: FriendShip[]) => ({
    type: types.SET_FRIEND_GATHER,
    friends
})

// * setFriendChat
export const setFriendChat = (friend?: FriendShip | null) => ({
    type: types.SET_FRIEND_CHAT,
    friend
})

// * setFriendMessage
export const setFriendMessage = (friendMessages: Message[]) => ({
    type: types.SET_FRIEND_MESSAGES,
    friendMessages
})

// * setActiveRoom
export const setActiveRoom = (activeRoom: FriendShip | null) => ({
    type: types.SET_ACTIVE_ROOM,
    activeRoom
})

// * updateUnreadMessages
export const updateReduxUnreadMessages = (payload: { senderId: string, receiverId: string }) => ({
    type: types.UPDATE_UNREAD_MESSAGES,
    payload
})

export class ChatAction {
    private retryCount: number = 0;
    private maxRetries: number = 5;

    // Initialize socket connection and listen for socket events
    async connectSocket(token: string, userId: string) {

        if (this.retryCount >= this.maxRetries) {
            console.log("Reached max retries, stopping reconnection.");
            return;
        }

        let url = socketUrl + '/tracker';

        //signalR
        let signal = new signalR.HubConnectionBuilder() //Server address
            .withUrl(url, { accessTokenFactory: () => token })
            .build();

        signal
            .start()
            .then(function (data: any) {
                signal.invoke('chatData');
                console.log("Successfully connected to the signalr server");

                // Save the socket object first
                store.dispatch(setSignal(signal));
            })
            .catch((error: any) => {
                console.log('Reconnecting...', error);
                this.retryCount++;
                setTimeout(() => this.connectSocket(token, userId), 5000);
            });

        // Get all group and friend data
        signal.on("chatData", async (res: ServerRes) => {
            if (res.code) {
                return console.log('onChatDataError: ', res.msg);
            }
            await this.handleChatData({ friendData: res.data.friendData });
            store.dispatch(setDropped(false));
        });

        signal.onclose(async () => {
            console.log("Listen for connection closure");
            this.connectSocket(token, userId);
        });

        // // Initialize event listening
        // signal.on('ActiveGroupUser', (data: any) => {
        //     console.log('activeGroupUser', data);
        //     commit(SET_ACTIVE_GROUP_USER, data.data);
        // });

        // signal.on('addGroup', (res: ServerRes) => {
        //     console.log('on addGroup', res);
        //     if (res.code) {
        //         return Vue.prototype.$message.error(res.msg);
        //     }
        //     Vue.prototype.$message.success(res.msg);
        //     commit(SET_GROUP_GATHER, res.data);
        // });

        // signal.on('joinGroup', async (res: ServerRes) => {
        //     console.log('on joinGroup', res);
        //     if (res.code) {
        //         return Vue.prototype.$message.error(res.msg);
        //     }
        //     let newUser = res.data.user;
        //     let group = res.data.group;
        //     if (newUser.userId != user.userId) {
        //         commit(SET_USER_GATHER, newUser);
        //         return Vue.prototype.$message.info(`${newUser.username}加入群${group.groupName}`);
        //     } else {
        //         console.log(state.groupGather, group.groupId);
        //         debugger;
        //         // 是用户自己 则加入到某个群
        //         if (!state.groupGather[group.groupId]) {
        //             commit(SET_GROUP_GATHER, group);
        //             // 获取群里面所有用户的用户信息
        //             signal.invoke('chatData');
        //         }
        //         Vue.prototype.$message.info(`成功加入群${group.groupName}`);
        //         commit(SET_ACTIVE_ROOM, state.groupGather[group.groupId]);
        //     }
        // });

        // signal.on('JoinGroupSocket', (res: ServerRes) => {
        //     console.log('on joinGroupSocket', res);
        //     if (res.code) {
        //         return Vue.prototype.$message.error(res.msg);
        //     }
        //     let newUser: Friend = res.data.user;
        //     let group: Group = res.data.group;
        //     let friendGather = state.friendGather;
        //     if (newUser.userId != user.userId) {
        //         commit(SET_USER_GATHER, newUser);
        //         if (friendGather[newUser.userId]) {
        //             // 当用户的好友更新了用户信息
        //             let messages;
        //             if (friendGather[newUser.userId].messages) {
        //                 messages = friendGather[newUser.userId].messages;
        //             }
        //             commit(SET_FRIEND_GATHER, newUser);
        //             commit(SET_FRIEND_MESSAGES, messages);
        //         }
        //         // @ts-ignore 解决重复进群消息问题
        //         if (window.msg === newUser.userId) {
        //             return;
        //         }
        //         // @ts-ignore
        //         window.msg = newUser.userId;
        //         return Vue.prototype.$message.info(`${newUser.userName}加入群${group.groupName}`);
        //     } else {
        //         if (!state.groupGather[group.groupId]) {
        //             commit(SET_GROUP_GATHER, group);
        //         }
        //         commit(SET_USER_GATHER, newUser);
        //     }
        // });

        // signal.on('GroupMessage', (res: ServerRes) => {
        //     console.log('on groupMessage', res);
        //     if (!res.code) {
        //         commit(ADD_GROUP_MESSAGE, res.data);
        //         let activeRoom = state.activeRoom;
        //         if (activeRoom && activeRoom.groupId !== res.data.groupId) {
        //             commit(ADD_UNREAD_GATHER, res.data.groupId);
        //         }
        //     } else {
        //         Vue.prototype.$message.error(res.msg);
        //     }
        // });

        signal.on('addFriend', (res: ServerRes) => {
            if (!res.code && res.data?.friendId === userId) {
                toast.notify(res.msg);
            } else {
                toast.error(res.msg)
            }
        });

        signal.on('JoinFriendSocket', (res: ServerRes) => {
            console.log('on JoinFriendSocket', res);
            if (!res.code) {
                console.log('Successfully joined the private chat room');
            }
        });

        signal.on('friendMessage', (res: ServerRes) => {
            if (!res.code) {
                if (res.data.receiverId === userId || res.data.senderId === userId) {
                    store.dispatch(addFriendMessage(res.data as Message));
                    // let activeRoom = state.activeRoom;
                    // if (activeRoom && activeRoom.userId !== res.data.userId) {
                    //     commit(ADD_UNREAD_GATHER, res.data.userId);
                    // }
                }
            } else {
                console.log("onFriendMessageError: ", res.msg);
            }
        });

        signal.on('OnError', (res: ServerRes) => {
            console.log("OnError: ", res.msg);
        });

        // signal.on('ExitGroup', (res: ServerRes) => {
        //     if (!res.code) {
        //         commit(DEL_GROUP, res.data);
        //         commit(SET_ACTIVE_ROOM, state.groupGather[DEFAULT_GROUP]);
        //         Vue.prototype.$message.success(res.msg);
        //     } else {
        //         Vue.prototype.$message.error(res.msg);
        //     }
        // });

        // signal.on('ExitFriend', (res: ServerRes) => {
        //     if (!res.code) {
        //         commit(DEL_FRIEND, res.data);
        //         commit(SET_ACTIVE_ROOM, state.groupGather[DEFAULT_GROUP]);
        //         Vue.prototype.$message.success(res.msg);
        //     } else {
        //         Vue.prototype.$message.error(res.msg);
        //     }
        // });
    }

    async handleChatData(payload: { friendData?: FriendShip[] | null }) {
        const { userId } = store.getState()?.global;
        const { signal } = store.getState()?.chat;

        let { friendData } = payload;

        if (userId && friendData && friendData.length > 0) {
            store.dispatch(setFriendGather(friendData));
            for (let friend of friendData) {
                signal.invoke('JoinFriendSocket', userId, friend.info.friendId);
            }
        }

        /**
            Since both groupgather and userGather are updated, but activeGather is still the old object,
            Here we need to find the latest gather object based on the old activeGather, so that vue's watch can listen to the new gather
        */

        let activeRoom = store.getState()?.chat?.activeRoom;
        let friendGather2 = store.getState()?.chat?.friendGather;
        // if (!activeRoom) {
        //     // After updating the data, there is no default activeRoom setting group to 'Atom Chat Room'
        //     return commit(SET_ACTIVE_ROOM, groupGather[DEFAULT_GROUP]);
        // }
        store.dispatch(setActiveRoom(friendGather2[activeRoom.info.friendId]));
    }
};

export const chatService = new ChatAction();