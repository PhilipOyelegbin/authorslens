import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseAPI } from "../api";

const initialState = {loading: false, token: [], error: ""}

export const authUser = createAsyncThunk("auth/authUser", async (data) => {
    const resp = await baseAPI.post("/auth/token", data);
    return resp.data
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(authUser.pending, state => state.loading = true),
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.loading = false,
            state.token = action.payload
        }),
        builder.addCase(authUser.rejected, (state, action) => {
            state.loading = false,
            state.token = [],
            state.error = action.error.message
        })
    }
})

export default authSlice.reducer;