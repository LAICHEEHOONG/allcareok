import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  serviceType: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },

    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    },
  },
});

export const { setSearchValue, setServiceType } = searchSlice.actions;

export default searchSlice.reducer;
