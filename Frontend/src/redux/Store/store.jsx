// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: { activePage: "Home" },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = navSlice.actions;

const store = configureStore({
  reducer: {
    nav: navSlice.reducer,
  },
});

export default store;
