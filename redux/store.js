import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../redux/itemsRelated/itemsSlice";
import formReducer from "../redux/itemsRelated/formSlice";

export const store = configureStore({
	reducer: {
		items: itemsReducer,
		form: formReducer,
	},
});
