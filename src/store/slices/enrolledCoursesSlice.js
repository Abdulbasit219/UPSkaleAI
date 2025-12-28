import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnrolledCourses = createAsyncThunk(
  "enrolledCourses/fetch",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/learning/progress");
      return response?.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enrolledCoursesSlice.reducer;
