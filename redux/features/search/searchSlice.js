import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  serviceType: "",
  fire: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setFire: (state) => {
      state.fire = state.fire ? false : true;
    },
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    },
  },
});

export const { setSearchValue, setFire, setServiceType } = searchSlice.actions;

export default searchSlice.reducer;
