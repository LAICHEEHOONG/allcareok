import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardFocus: "photo",
  adsId: "",
  ads: [],
  blockServiceBtn: false,
  ad: {},
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setFocus: (state, action) => {
      state.cardFocus = action.payload;
    },
    setAdsID: (state, action) => {
      state.adsId = action.payload;
    },
    setAds: (state, action) => {
      state.ads = action.payload;
    },
    setBlockServiceBtn: (state, action) => {
      state.blockServiceBtn = action.payload;
    },
    setAd: (state, action) => {
      state.ad = action.payload
    }
  },
});

export const { setFocus, setAdsID, setAds, setBlockServiceBtn, setAd } =
  editorSlice.actions;

export default editorSlice.reducer;
