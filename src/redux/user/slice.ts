import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean,
  error: string | null,
  token: string | null
}
const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}
export const signIn = createAsyncThunk('user/signIn',
  async (paramaters: {
    email: string,
    password: string
  }, thunkAPI) => {


    // const {data} = await axios.post('http://123.56.149.216:8080/auth/login',{email: paramaters.email,password: paramaters.password})
    // return data.token

    type resolveType = string
    const mockData = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJlbWFpbGFkZHJlc3MiOiIyNDM2MTI5MTMyQHFxLmNvbSIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTIzNDU2LCJleHAiOjEyMzQ1NiwiaXNzIjoibGlzaGFuLmNvbSIsImF1ZCI6Imxpc2hhbi5jb20iLCJ1c2VybmFtZSI6Imxpc2hhbi5jb20ifQ.Ob9q367Jn0pPhEjTOinuXbv9jTInM_1ITu_J2nqhIRU'
    return new Promise<resolveType>(resolve => {
      resolve(mockData)
    })
  })
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.loading = false
      state.token = null
      state.error = null
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      // return {...state, loading: true}
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
}) 