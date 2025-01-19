import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "user",
  email: "",
  image: "",
  name: "",
  signIn: "",
  _id: "",
  language: "",
  lang: "",
  country: "",
  session: null,
  status: "",
  dbCountry: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDBCountry: (state, action) => {
      state.dbCountry = action.payload
    },
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
    updateLanguage: (state, action) => {
      state.language = action.payload.replace(/^\//, "");
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload || "";
    },
  },
});

export const {
  signInStatus,
  userInfo,
  updateLanguage,
  setLang,
  setCountry,
  setSession,
  setStatus,
  setDBCountry
} = authSlice.actions;

export default authSlice.reducer;
