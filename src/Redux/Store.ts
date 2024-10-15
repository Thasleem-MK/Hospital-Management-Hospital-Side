import { configureStore } from "@reduxjs/toolkit";
import sideBar from "./SideBar";
import DashbordSlice from "./Dashboard";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    Sidebar: sideBar,
    Dashboard: DashbordSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
