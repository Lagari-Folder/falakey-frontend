import { createSlice } from "@reduxjs/toolkit";

const transSlice = createSlice({
  name: "Translation",
  initialState: {
    local: "ar",
    dir: "ltr",
  },
  reducers: {
    change: (state, action) => {
      state.local = action.payload.local;
      state.dir = action.payload.dir;
    },
  },
});

export const { change } = transSlice.actions;
export default transSlice.reducer;
