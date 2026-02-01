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

export const updateSkill = createAsyncThunk(
  "profile/updateSkill",
  async (
    { skillId, skillName, level, lastPracticed, progress },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put("/api/user/profile/skills", {
        skillId,
        skillName,
        level,
        lastPracticed,
        progress,
      });
      return response.data.skill;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update skill");
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "profile/deleteSkill",
  async ({ skillId, skillName }, { rejectWithValue }) => {
    try {
      await axios.delete("/api/user/profile/skills", {
        data: { skillId, skillName },
      });
      return skillId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete skill");
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

export const fetchLearningPath = createAsyncThunk(
  "profile/fetchLearningPath",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/user/profile/learning-path");
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addExperience = createAsyncThunk(
  "profile/addExperience",
  async (experienceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/profile/experience",
        experienceData
      );
      return response.data.experience;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add experience"
      );
    }
  }
);

export const updateExperience = createAsyncThunk(
  "profile/updateExperience",
  async ({ experienceId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/user/profile/experience", {
        experienceId,
        ...data,
      });
      return response.data.experience;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update experience"
      );
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "profile/deleteExperience",
  async (experienceId, { rejectWithValue }) => {
    try {
      await axios.delete("/api/user/profile/experience", {
        data: { experienceId },
      });
      return experienceId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete experience"
      );
    }
  }
);

export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async (educationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/profile/education",
        educationData
      );
      return response.data.education;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add education");
    }
  }
);

export const updateEducation = createAsyncThunk(
  "profile/updateEducation",
  async ({ educationId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/user/profile/education", {
        educationId,
        ...data,
      });
      return response.data.education;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update education"
      );
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "profile/deleteEducation",
  async (educationId, { rejectWithValue }) => {
    try {
      await axios.delete("/api/user/profile/education", {
        data: { educationId },
      });
      return educationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete education"
      );
    }
  }
);

const generateStreak = (streakDays) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const todayIndex = new Date().getDay();

  return days.map((day, index) => {
    let diff = todayIndex - index;
    if (diff < 0) diff += 7;

    return {
      day,
      active: diff < streakDays,
    };
  });
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
    streak: [],
    learningPath: [],
    learningPathLoading: false,
  },
  reducers: {
    // Generate learning streak
    setStreak: (state, action) => {
      const streakDays = action.payload || 0;
      state.streak = generateStreak(streakDays);
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

        const streakDays = action.payload?.streak || 0;
        state.streak = generateStreak(streakDays);
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
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        if (state.data?.skills) {
          const index = state.data.skills.findIndex(
            (skill) => skill._id === action.payload._id
          );
          if (index !== -1) {
            state.data.skills[index] = action.payload;
          }
        }
      })

      .addCase(deleteSkill.fulfilled, (state, action) => {
        if (state.data?.skills) {
          state.data.skills = state.data.skills.filter(
            (skill) => skill._id !== action.payload
          );
        }
      })

      .addCase(fetchLearningPath.pending, (state) => {
        state.learningPathLoading = true;
      })
      .addCase(fetchLearningPath.fulfilled, (state, action) => {
        state.learningPath = action.payload;
        state.learningPathLoading = false;
      })
      .addCase(fetchLearningPath.rejected, (state) => {
        state.learningPathLoading = false;
      })

      .addCase(addExperience.fulfilled, (state, action) => {
        if (state.data?.experience) {
          state.data.experience.push(action.payload);
        } else {
          state.data.experience = [action.payload];
        }
      })

      .addCase(updateExperience.fulfilled, (state, action) => {
        if (state.data?.experience) {
          const index = state.data.experience.findIndex(
            (exp) => exp._id === action.payload._id
          );
          if (index !== -1) {
            state.data.experience[index] = action.payload;
          }
        }
      })

      .addCase(deleteExperience.fulfilled, (state, action) => {
        if (state.data?.experience) {
          state.data.experience = state.data.experience.filter(
            (exp) => exp._id !== action.payload
          );
        }
      })

      .addCase(addEducation.fulfilled, (state, action) => {
        if (state.data?.education) {
          state.data.education.push(action.payload);
        } else {
          state.data.education = [action.payload];
        }
      })

      .addCase(updateEducation.fulfilled, (state, action) => {
        if (state.data?.education) {
          const index = state.data.education.findIndex(
            (edu) => edu._id === action.payload._id
          );
          if (index !== -1) {
            state.data.education[index] = action.payload;
          }
        }
      })

      .addCase(deleteEducation.fulfilled, (state, action) => {
        if (state.data?.education) {
          state.data.education = state.data.education.filter(
            (edu) => edu._id !== action.payload
          );
        }
      });
  },
});

export const { setStreak, clearError } = profileSlice.actions;
export default profileSlice.reducer;
