import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseAPI } from "../api";

const initialState = {loading: false, user: [], error: ""}

export const logUser = createAsyncThunk("login/logUser", async (data) => {
    const resp = await baseAPI.post("/accounts/login", data);
    return resp.data
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(logUser.pending, state => state.loading = true),
        builder.addCase(logUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload
        }),
        builder.addCase(logUser.rejected, (state, action) => {
            state.loading = false,
            state.user = [],
            state.error = action.error.message
        })
    }
})

export default loginSlice.reducer;