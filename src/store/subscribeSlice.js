import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseAPI } from "../api";

const initialState = {loading: false, subscriber: "", error: ""}

export const postSubscriber = createAsyncThunk("subscribe/postSubscriber", async (data) => {
    const resp = await baseAPI.post("/susbscribe", data);
    return resp.data
})

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(postSubscriber.pending, state => state.loading = true),
        builder.addCase(postSubscriber.fulfilled, (state, action) => {
            state.loading = false;
            if(action.error?.message) {
                state.error = action.error.message
            } else {
                state.error = ""
                state.subscriber = action.payload
            }
        }),
        builder.addCase(postSubscriber.rejected, (state, action) => {
            state.loading = false,
            state.subscriber = "",
            state.error = action.error.message
        })
    }
})

export default subscribeSlice.reducer;