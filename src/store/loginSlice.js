import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseAPI } from "../api/api"

const initialState = {loading: false, user: [], error: ""}

export const getUser = createAsyncThunk("auth/getUser", async () => {
    const resp = await baseAPI.get("/login")
    return resp.data
})

const loginSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, state => state.loading = true),
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload
        }),
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false,
            state.user = [],
            state.error = action.error.message
        })
    }
})

export default loginSlice.reducer;