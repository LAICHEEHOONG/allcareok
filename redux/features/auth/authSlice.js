import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "user",
  email: "",
  image: "",
  name: "",
  signIn: "",
  _id: "",
  language: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStatus: (state, action) => {
      state.signIn = action.payload;
    },
    userInfo: (state, action) => {
      const { email, image, name, role, _id, language } = action.payload;
      state.email = email;
      state.image = image;
      state.name = name;
      state.role = role;
      state._id = _id;
      state.language = language;
    },
  },
});

export const { signInStatus, userInfo } = authSlice.actions;

export default authSlice.reducer;
