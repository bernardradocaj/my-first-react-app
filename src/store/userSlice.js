import { createSlice } from "@reduxjs/toolkit";
import { fetchUserByName, fetchUserRepos } from "./userActions";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    errorMessage: "",
    isDetailsLoading: false,
    details: null,
    repos: [],
  },
  reducers: {
    setName: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.name = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
    setIsDetailsLoading: (state, { payload }) => {
      state.isDetailsLoading = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserByName.fulfilled, (state, action) => {
      // Add user details to details key in state
      state.details = action.payload;
      state.isDetailsLoading = false;
    });
    builder.addCase(fetchUserByName.pending, (state) => {
      state.isDetailsLoading = true;
    });
    builder.addCase(fetchUserByName.rejected, (state, action) => {
      const { payload } = action;
      state.isDetailsLoading = false;
      state.errorMessage = payload;
    });
    // fetch user repositories
    builder.addCase(fetchUserRepos.fulfilled, (state, action) => {
      state.repos = action.payload;
      state.isDetailsLoading = false;
    });
    builder.addCase(fetchUserRepos.pending, (state) => {
      state.isDetailsLoading = true;
    });
    builder.addCase(fetchUserRepos.rejected, (state, action) => {
      const { payload } = action;
      state.isDetailsLoading = false;
      state.errorMessage = payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setName, clearErrorMessage, setIsDetailsLoading } = userSlice.actions;

export default userSlice.reducer;
