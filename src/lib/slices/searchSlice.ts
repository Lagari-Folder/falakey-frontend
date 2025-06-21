import { createSlice } from "@reduxjs/toolkit";

// Function to extract URL parameters
const getInitialStateFromURL = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    types: params.get("types") || "photo", // Default to "photo" if not in URL
    placeholder: "",
    search: params.get("search") || null,
    filter: {
      orientation: params.get("orientation") || null,
      size: params.get("size") || null,
      color: params.get("color") || null,
    },
    sort: params.get("sort") || null,
    collection: params.get("collection") || null,
  };
};

const searchSlice = createSlice({
  name: "search",
  initialState: getInitialStateFromURL(), // Use extracted params as the initial state
  reducers: {
    search: (state, action) => {
      state.types = action.payload.types;
      state.placeholder = action.payload.placeholder;
      state.search = action.payload.search;
      state.filter = action.payload.filter;
      state.sort = action.payload.sort;
      state.collection = action.payload.collection;
    },
    clear: (state) => {
      state.types = "photo";
      state.placeholder = "";
      state.search = null;
      state.filter = { orientation: null, size: null, color: null };
      state.sort = null;
      state.collection = null;
    },
  },
});

export const { search, clear } = searchSlice.actions;
export default searchSlice.reducer;
