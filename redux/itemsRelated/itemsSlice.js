import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  response: null,
  loading: false,
  items: []
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    doneSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    // getDeleteSuccess: (state) => {
    //     state.loading = false;
    //     state.error = null;
    //     state.response = null;
    // },
    getRequest: (state) => {
        state.loading = true;
    },
    getFailed: (state, action) => {
        state.response = action.payload;
        state.loading = false;
        state.error = null;
    },
    getError: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  }
});

export const {
  doneSuccess,
  getRequest,
  getFailed,
  getError
} = itemsSlice.actions;

export default itemsSlice.reducer;