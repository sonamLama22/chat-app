import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "",
  _id: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      console.log(state);
      const { name, _id, token } = actions.payload;
      state.name = name;
      state._id = _id;
      state.token = token;
    },
    resetDetails: (state, actions) => {
      state.name = "";
      state._id = "";
      state.token = "";
    },
  },
});

export const { setUserDetails, resetDetails } = userSlice.actions;
export default userSlice.reducer;
