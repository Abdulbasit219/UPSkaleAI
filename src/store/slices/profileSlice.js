import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/profile");
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

// Async thunk to update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/user/profile", updateData);
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

// Async thunk to update avatar
export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await axios.put("/api/user/profile", formData);
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update avatar");
    }
  }
);

// Async thunk to update cover photo
export const updateCoverPhoto = createAsyncThunk(
  "profile/updateCoverPhoto",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("coverPhoto", file);
      const response = await axios.put("/api/user/profile", formData);
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update cover");
    }
  }
);

// Async thunk to delete project
export const deleteProjectAction = createAsyncThunk(
  "profile/deleteProject",
  async ({ projectId, projectTitle }, { rejectWithValue }) => {
    try {
      await axios.delete("/api/user/profile/project", {
        data: { projectId, projectTitle },
      });
      return projectId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete project"
      );
    }
  }
);

// Async thunk to add skill
export const addSkill = createAsyncThunk(
  "profile/addSkill",
  async ({ userId, skillName, level, lastPracticed }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/profile/skills", {
        userId,
        skillName,
        level,
        lastPracticed,
      });
      return response.data.skill;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add skill");
    }
  }
);

// Async thunk to delete cover photo
export const deleteCoverPhoto = createAsyncThunk(
  "profile/deleteCoverPhoto",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/user/profile", {
        data: { type: "cover" },
      });
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete cover photo"
      );
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  "profile/deleteAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/user/profile", {
        data: { type: "avatar" },
      });
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete avatar");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
    streak: [],
  },
  reducers: {
    // Generate learning streak
    setStreak: (state, action) => {
      const days = ["S", "M", "T", "W", "T", "F", "S"];
      const streakDays = action.payload || 0;
      state.streak = days.map((day, i) => ({
        day,
        active: i < streakDays,
      }));
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // Auto-generate streak
        const days = ["S", "M", "T", "W", "T", "F", "S"];
        const streakDays = action.payload?.streak || 0;
        state.streak = days.map((day, i) => ({
          day,
          active: i < streakDays,
        }));
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Avatar
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      // Delete Avatar
      .addCase(deleteAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cover Photo
      .addCase(updateCoverPhoto.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      // Delete Cover Photo
      .addCase(deleteCoverPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoverPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCoverPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Project
      .addCase(deleteProjectAction.fulfilled, (state, action) => {
        if (state.data?.projects) {
          state.data.projects = state.data.projects.filter(
            (p) => p._id !== action.payload
          );
        }
      })

      // Add Skill
      .addCase(addSkill.fulfilled, (state, action) => {
        if (state.data?.skills) {
          state.data.skills.push(action.payload);
        }
      });
  },
});

export const { setStreak, clearError } = profileSlice.actions;
export default profileSlice.reducer;
