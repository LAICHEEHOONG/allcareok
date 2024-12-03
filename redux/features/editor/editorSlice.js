import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardFocus: "photo",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setFocus: (state, action) => {
      state.cardFocus = action.payload;
    },
    // signInStatus: (state, action) => {
    //   state.signIn = action.payload;
    // },
    // userInfo: (state, action) => {
    //   const { email, image, name, role, _id, language } = action.payload;
    //   state.email = email;
    //   state.image = image;
    //   state.name = name;
    //   state.role = role;
    //   state._id = _id;
    //   state.language = language;
    // },
    // updateLanguage: (state, action) => {
    //   state.language = action.payload.replace(/^\//, "");
    // },
    // setLang: (state, action) => {
    //   state.lang = action.payload
    // }
  },
});

export const { setFocus } = editorSlice.actions;

export default editorSlice.reducer;
