import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ADS: [],
  standby_ADS: [],
  total: 0,
  page: 0,
  limit: 0,
  totalPages: 0,
};

export const ADSSlice = createSlice({
  name: "ADS",
  initialState,
  reducers: {
    setADS: (state, action) => {
      state.ADS = action.payload;
    },
    setStandbyADS: (state, action) => {
      state.standby_ADS = action.payload;
    },
    setPagination: (state, action) => {
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setADS, setPagination, setStandbyADS } = ADSSlice.actions;

export default ADSSlice.reducer;
