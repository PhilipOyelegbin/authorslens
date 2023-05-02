import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {loading: false, email: "", error: ""}

export const postSubscriber = createAsyncThunk("subscribe/postSubscriber", async (data) => {
    const resp = await axios.get(import.meta.env.VITE_APP_SUBSCRIBE_ROUTE, data);
    return resp.data
})

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(postSubscriber.pending, state => state.loading = true),
        builder.addCase(postSubscriber.fulfilled, (state, action) => {
            state.loading = false,
            state.email = action.payload
        }),
        builder.addCase(postSubscriber.rejected, (state, action) => {
            state.loading = false,
            state.email = "",
            state.error = action.error.message
        })
    }
})

export default subscribeSlice.reducer;