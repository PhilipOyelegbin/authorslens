import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAPI } from "../api";

const initialState = {loading: false, data: [], error: ""}

export const searchBlogs = createAsyncThunk("blog/searchBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    return resp.data;
})

const searchSlice = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(searchBlogs.pending, (state => {state.loading = true}))
        builder.addCase(searchBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload
        })
        builder.addCase(searchBlogs.rejected, (state, action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
    }
})

export default searchSlice.reducer