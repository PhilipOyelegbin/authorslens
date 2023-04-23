import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAPI } from "../api/api";


const initialState = {loading: false, blogs: [], error: ""}

export const getLatestBlogs = createAsyncThunk("blogs/getLatestBlogs", async () => {
    const resp = await baseAPI.get("/users?size=5");
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