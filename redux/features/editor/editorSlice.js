import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardFocus: "photo",
  adsId: "",
  ads: [],
  blockServiceBtn: false,
  ad: {},
  popUp: false,
  mode: "test",
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
      state.ad = action.payload;
    },
    setPopUp: (state) => {
      if (state.popUp) {
        state.popUp = false;
      } else {
        state.popUp = true;
      }
    },
  },
});

export const {
  setFocus,
  setAdsID,
  setAds,
  setBlockServiceBtn,
  setAd,
  setPopUp,
} = editorSlice.actions;

export default editorSlice.reducer;
