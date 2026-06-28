import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import GoalService from "./GoalService"

const initialState={
    goals:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}
  //createGoal
export const createGoal=createAsyncThunk('goals/create',async(goal,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token

      return await GoalService.createGoal(goal,token)
      
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue({message})
    }
})

// getGoals

export const getGoals=createAsyncThunk('goals/getAll',async(_,thunkAPI)=>{
   try {
    const token=thunkAPI.getState().auth.user.token
    return await GoalService.getGoal(token)
   } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue({message})
   }
})


  //delete Goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      await GoalService.deleteGoal(goalId, token)

      return goalId
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const GoalSlice=createSlice({
    name:"goals",
    initialState,
    reducers:{
       reset: (state) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = false
  state.message = ''
}},

    extraReducers:(builder)=>{
        builder
        .addCase(createGoal.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createGoal.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.goals.push(action.payload)
                })
        .addCase(createGoal.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload.message
                   // state.goals.push(action.payload)
                })
        .addCase(getGoals.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getGoals.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
})
        .addCase(getGoals.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload.message
                })


        .addCase(deleteGoal.pending,(state)=>{
            state.isLoading=true
        })

  .addCase(deleteGoal.fulfilled, (state, action) => {
  state.isLoading = false
  state.isSuccess = true

  state.goals = state.goals.filter(
    (goal) => goal._id !== action.payload
  )
})

        .addCase(deleteGoal.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload.message
                })
                
    }
})

export const {reset}=GoalSlice.actions
export default GoalSlice.reducer
