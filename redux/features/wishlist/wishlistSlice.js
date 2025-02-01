import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistsAd: [],
};

export const wishlistsSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    setWishlistPage: (state, action) => {
      state.wishlistsAd = action.payload
    },
  },
});

export const { setWishlistPage } = wishlistsSlice.actions;

export default wishlistsSlice.reducer;
