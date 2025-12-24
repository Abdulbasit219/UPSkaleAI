import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import profileReducer from "./slices/profileSlice";
import enrolledCoursesReducer from "./slices/enrolledCoursesSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    profile: profileReducer,
    enrolledCourses: enrolledCoursesReducer,
  },
});
