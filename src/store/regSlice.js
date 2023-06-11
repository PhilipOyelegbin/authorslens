import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseAPI } from "../api";

const initialState = {loading: false, user: [], error: ""}

export const postUser = createAsyncThunk("regUser/postUser", async (data) => {
    const resp = await baseAPI.post("/accounts/signup", data);
    return resp.data
})

const regSlice = createSlice({
    name: "regUser",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(postUser.pending, state => state.loading = true),
        builder.addCase(postUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload
        }),
        builder.addCase(postUser.rejected, (state, action) => {
            state.loading = false,
            state.user = [],
            state.error = action.error.message
        })
    }
})

export default regSlice.reducer;