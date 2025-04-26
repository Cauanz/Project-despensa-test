import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../redux/itemsRelated/itemsSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
})