import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import loginSlice from "./loginSlice";
import authSlice from "./authSlice";
import regSlice from "./regSlice";
import subscribeSlice from "./subscribeSlice";
import latestBlogSlice from "./latestBlogSlice";

const Store = configureStore({
    reducer: {
        blogs: blogSlice,
        latestBlogs: latestBlogSlice,
        regUser: regSlice,
        subscribe: subscribeSlice,
        loginUser: loginSlice,
        authUser: authSlice
    }
})

export default Store;