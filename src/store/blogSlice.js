import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseAPI } from "../api";

const initialState = {loading: false, blogs: [], create: [], read: [], update: [], remove: [], latest_blogs: [], error: ""}

// get all blogs request
export const getBlogs = createAsyncThunk("blog/getBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    return resp.data;
})

// post blog request
export const postBlog = createAsyncThunk("blog/postBlog", async (data) => {
    const resp = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
    })
    return resp;
})

// update blog request
export const updateBlog = createAsyncThunk("blog/updateBlog", async (data) => {
    const resp = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/blogs/${data?.id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
    })
    return resp;
})

// delete blogs request
export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id) => {
    const resp = await baseAPI.delete(`/blogs/${id}`, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
    });
    return resp.status;
})

// get latest blogs request
export const getLatestBlogs = createAsyncThunk("blogs/getLatestBlogs", async () => {
    const resp = await baseAPI.get("/blogs?ordering=-created_on?size=6");
    return resp.data;
})

// get by technology category blogs request
export const getTechnologyBlogs = createAsyncThunk("blog/getTechnologyBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    const filterTechnology = resp.data?.filter(list => list.category === "Technology")
    return filterTechnology;
})

// get by technology category blogs request
export const getRelationshipBlogs = createAsyncThunk("blog/getRelationshipBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    const filterTechnology = resp.data?.filter(list => list.category === "Relationship")
    return filterTechnology;
})

// get by technology category blogs request
export const getLifestyleBlogs = createAsyncThunk("blog/getLifestyleBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    const filterTechnology = resp.data?.filter(list => list.category === "Lifestyle")
    return filterTechnology;
})

// get by others category blogs request
export const getOtherBlogs = createAsyncThunk("blog/getOtherBlogs", async () => {
    const resp = await baseAPI.get("/blogs");
    const filterOthers = resp.data?.filter(list => list.category === "Others")
    return filterOthers;
})

// search blogs request
export const searchBlogs = createAsyncThunk("blog/searchBlogs", async (data) => {
    const resp = await baseAPI.get(`/blogs?search=${data}`);
    return resp.data;
})

// read more blogs request
export const readBlog = createAsyncThunk("blog/readBlogs", async (id) => {
    const resp = await baseAPI.get(`/blogs/${id}`);
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
        builder.addCase(postBlog.pending, (state => {state.loading = true})),
        builder.addCase(postBlog.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.create = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(postBlog.rejected, (state, action) => {
            state.loading = false,
            state.create = [],
            state.error = action.error.message
        }),
        // ------------------update blog--------------------
        builder.addCase(updateBlog.pending, (state => {state.loading = true})),
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.update = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.loading = false,
            state.update = [],
            state.error = action.error.message
        }),
        // ------------------delete blog--------------------
        builder.addCase(deleteBlog.pending, (state => {state.loading = true})),
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.remove = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.loading = false,
            state.remove = [],
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
        }),
        // --------------------filter blogs by technology---------------------
        builder.addCase(getTechnologyBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getTechnologyBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(getTechnologyBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // --------------------filter blogs by relationship---------------------
        builder.addCase(getRelationshipBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getRelationshipBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(getRelationshipBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // --------------------filter blogs by lifestyle---------------------
        builder.addCase(getLifestyleBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getLifestyleBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(getLifestyleBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // --------------------filter blog by others---------------------
        builder.addCase(getOtherBlogs.pending, (state => {state.loading = true}))
        builder.addCase(getOtherBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(getOtherBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // --------------------search blogs--------------------
        builder.addCase(searchBlogs.pending, (state => {state.loading = true})),
        builder.addCase(searchBlogs.fulfilled, (state, action) => {
            state.loading = false,
            state.blogs = action.payload
        }),
        builder.addCase(searchBlogs.rejected, (state, action) => {
            state.loading = false,
            state.blogs = [],
            state.error = action.error.message
        }),
        // --------------------read blogs--------------------
        builder.addCase(readBlog.pending, (state => {state.loading = true})),
        builder.addCase(readBlog.fulfilled, (state, action) => {
            state.loading = false,
            state.read = action.payload
        }),
        builder.addCase(readBlog.rejected, (state, action) => {
            state.loading = false,
            state.read = [],
            state.error = action.error.message
        })
    }
})

export default blogSlice.reducer