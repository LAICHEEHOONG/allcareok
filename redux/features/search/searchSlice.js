import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  fire: false
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setFire: (state) => {
      state.fire = state.fire ? false : true
    }
  },
});

export const { setSearchValue, setFire } = searchSlice.actions;

export default searchSlice.reducer;
