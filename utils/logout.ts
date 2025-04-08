import { store } from "@/redux"
import { setActiveRoom, setDropped, setFriendChat, setFriendGather, setFriendMessage, setSignal, setSocket } from "@/redux/modules/chat/action";
import { setRefreshToken, setToken, setUserId } from "@/redux/modules/global/action";
import { setUserInfo } from "@/redux/modules/user/action"

export const onAfterLogout = () => {
    store.dispatch(setUserInfo(null));
    store.dispatch(setToken(""));
    store.dispatch(setRefreshToken(""));
    store.dispatch(setUserId(""));
    store.dispatch(setSocket(null));
    store.dispatch(setSignal(null));
    store.dispatch(setDropped(false));
    store.dispatch(setFriendGather([]));
    store.dispatch(setFriendChat(null));
    store.dispatch(setFriendMessage([]));
    store.dispatch(setActiveRoom(null));
}