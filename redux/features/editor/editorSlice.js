import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardFocus: "photo",
  adsId: "",
  ads: [],
  blockServiceBtn: false,
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
  },
});

export const { setFocus, setAdsID, setAds, setBlockServiceBtn } =
  editorSlice.actions;

export default editorSlice.reducer;
