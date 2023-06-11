import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAPI } from "../api";

const initialState = {loading: false, blogs: [], error: ""}

export const getBlogs = createAsyncThunk("blog/getBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    return resp.data;
})

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        })
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        })
    }
})

export default blogSlice.reducer