import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  chatId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, actions) => {
      console.log(state);
      state.chatId = actions.payload;
    },
    deselectChat: (state) => {
      state.chatId = null;
    },
  },
});

export const { selectChat, deselectChat } = chatSlice.actions;
export default chatSlice.reducer;
