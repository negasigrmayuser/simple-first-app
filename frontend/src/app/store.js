import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import  GoalReducer  from "../features/goals/GoalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals:GoalReducer,
  
  },
});




