import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {loading: false, blogs: [], error: ""}

export const getLatestBlogs = createAsyncThunk("blogs/getLatestBlogs", async () => {
    const resp = await axios.get(import.meta.env.VITE_APP_LATEST_BLOG_ROUTE);
    return resp.data;
})

const latestBlogSlice = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLatestBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getLatestBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        })
        builder.addCase(getLatestBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        })
    }
})

export default latestBlogSlice.reducer