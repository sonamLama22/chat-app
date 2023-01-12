import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, actions) => {
      console.log(state);
      state.selectedChat = actions.payload;
    },
    deselectChat: (state) => {
      state.selectedChat = null;
    },
  },
});

export const { selectChat, deselectChat } = chatSlice.actions;
export default chatSlice.reducer;
