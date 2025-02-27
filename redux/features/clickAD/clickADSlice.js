import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ID: "",
};

export const clickADSlice = createSlice({
  name: "clickAD",
  initialState,
  reducers: {
    setClickADValue: (state, action) => {
      state.ID = action.payload
    }
  },
});

export const { setClickADValue } = clickADSlice.actions;

export default clickADSlice.reducer;
