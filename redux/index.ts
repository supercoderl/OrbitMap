import { legacy_createStore as createStore, combineReducers, Store } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import global from "./modules/global/reducer";
import user from "./modules/user/reducer";
import chat from "./modules/chat/reducer";

// Create reducer (split reducer)
const reducer = combineReducers({
	global,
	user,
	chat
});

// Redux persistence configuration
const persistConfig = {
	key: "redux-state",
	storage: AsyncStorage,
	whitelist: ['global']
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// Open redux-devtools
// const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Using redux middleware
// const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// Create store
const store: Store = createStore(persistReducerConfig);

// Creating a persistent store
const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;

export { store, persistor };