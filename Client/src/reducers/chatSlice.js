import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currentUser: "",
};

const chatSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      console.log(state);
      const { name } = actions.payload;
      state.name = name;
    },
    resetDetails: (state, actions) => {
      state.name = "";
    },
  },
});

export const { setUserDetails, resetDetails } = chatSlice.actions;
export default chatSlice.reducer;
