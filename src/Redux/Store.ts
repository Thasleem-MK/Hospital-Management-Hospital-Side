import { configureStore } from "@reduxjs/toolkit";
import sideBar from "./SideBar";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    Sidebar: sideBar,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
