import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAPI } from "../api";

const initialState = {loading: false, blogs: [], create: [], latest_blogs: [], error: ""}

// get all blogs request
export const getBlogs = createAsyncThunk("blog/getBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    return resp.data;
})

// post blog request
export const postBlogs = createAsyncThunk("blog/postBlogs", async (data) => {
    const resp = await baseAPI.post("/blogs", data);
    return resp.data;
})

// get latest blogs request
export const getLatestBlogs = createAsyncThunk("blogs/getLatestBlogs", async () => {
    const resp = await baseAPI.get("/blogs?ordering=-created_on?size=6");
    return resp.data;
})

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        // --------------------all blogs--------------------
        builder.addCase(getBlogs.pending, (state => {state.loading = true})),
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // ------------------post blog--------------------
        builder.addCase(postBlogs.pending, (state => {state.loading = true})),
        builder.addCase(postBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(postBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // --------------------latest blogs---------------------
        builder.addCase(getLatestBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getLatestBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.latest_blogs = action.payload
        }),
        builder.addCase(getLatestBlogs.rejected, (state, action) => {
            state.loading = false,
            state.latest_blogs = [],
            state.error = action.error.message
        })
    }
})

export default blogSlice.reducer