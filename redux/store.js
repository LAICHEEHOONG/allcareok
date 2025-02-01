import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import editorSlice from "./features/editor/editorSlice";
import searchSlice from "./features/search/searchSlice";
import ADSSlice from "./features/ad/adSlice";
import wishlistsSlice from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    editor: editorSlice,
    search: searchSlice,
    ADS: ADSSlice,
    wishlists: wishlistsSlice,
  },
});
