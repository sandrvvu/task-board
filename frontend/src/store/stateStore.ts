import { configureStore } from "@reduxjs/toolkit";
import { listsSlice } from "./Slices/listsSlice";

export const store = configureStore({
  reducer: {
    lists: listsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
