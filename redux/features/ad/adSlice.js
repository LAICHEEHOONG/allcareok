import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ADS: [],
};

export const ADSSlice = createSlice({
  name: "ADS",
  initialState,
  reducers: {
    setADS: (state, action) => {
      state.ADS = action.payload;
    }
  },
});

export const { setADS } = ADSSlice.actions;

export default ADSSlice.reducer;
