import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "",
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      console.log(state);
      const { name, _id } = actions.payload;
      state.name = name;
      state._id = _id;
    },
    resetDetails: (state, actions) => {
      state.name = "";
      state._id = "";
    },
  },
});

export const { setUserDetails, resetDetails } = userSlice.actions;
export default userSlice.reducer;
