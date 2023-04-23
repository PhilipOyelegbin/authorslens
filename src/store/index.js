import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import loginSlice from "./loginSlice";
import regSlice from "./regSlice";
import subscribeSlice from "./subscribeSlice";
import latestBlogSlice from "./latestBlogSlice";

const Store = configureStore({
    reducer: {
        blogs: blogSlice,
        latestBlogs: latestBlogSlice,
        regUser: regSlice,
        subscribe: subscribeSlice,
        auth: loginSlice
    }
})

export default Store;