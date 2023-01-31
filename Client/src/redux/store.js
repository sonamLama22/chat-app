import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import userSlice from "../reducers/userSlice";
import chatSlice from "../reducers/chatSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
