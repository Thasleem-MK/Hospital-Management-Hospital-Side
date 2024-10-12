import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    openSidebar: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.openSidebar = !state.openSidebar;
    },
  },
});
// Action creators are generated for each case reducer function
export const { toggleSidebar } = sideBarSlice.actions;
export default sideBarSlice.reducer;