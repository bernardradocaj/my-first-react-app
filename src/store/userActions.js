import { createAsyncThunk } from '@reduxjs/toolkit';
import * as GithubService from "../services/GithubService";
import { AxiosError } from "axios";

// First, create the thunk
export const fetchUserByName = createAsyncThunk(
  "users/fetchUserByName",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState();
    try {
      return await GithubService.getUserByName(user.name);
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(
          `User by name ${user.name} not found!`,
          { errorMessage: error.message }
        );
      }
      throw error;
    }
  }
);

export const fetchUserRepos = createAsyncThunk(
  "users/fetchUserRepos",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState();
    try {
      return await GithubService.getUserRepos(user.name);
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(
          `User '${user.name}' does not have any repositories!`,
          { errorMessage: error.message }
        );
      }
      throw error;
    }
  }
);