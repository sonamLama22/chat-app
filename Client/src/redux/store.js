import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import userSlice from "../reducers/userSlice";
import chatSlice from "../reducers/chatSlice";

const reducer = combineReducers({
  chat: chatSlice,
  user: userSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
