import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ADS: [],
  total: 0,
  page: 0,
  limit: 0,
  totalPages: 1,
};

export const ADSSlice = createSlice({
  name: "ADS",
  initialState,
  reducers: {
    setADS: (state, action) => {
      state.ADS = [...state.ADS, ...action.payload];
    },
    // setStandbyADS: (state, action) => {
    //   state.standby_ADS = action.payload;
    // },
    setPagination: (state, action) => {
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    emptyADS: (state) => {
      state.ADS = [];
      state.total = 0;
      state.page = 0;
      state.limit = 0;
      state.totalPages = 1;
    },
  },
});

export const { setADS, setPagination, emptyADS } = ADSSlice.actions;

export default ADSSlice.reducer;
