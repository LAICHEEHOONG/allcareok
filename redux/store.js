import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import editorSlice from "./features/editor/editorSlice";
// import  screenSlice  from "./features/screen/screenSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    editor: editorSlice,
    // screen: screenSlice
  },
});
