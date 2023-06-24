import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import authSlice from "./authSlice";
import subscribeSlice from "./subscribeSlice";
import searchSlice from "./searchSlice";

const Store = configureStore({
    reducer: {
        blogs: blogSlice,
        subscribe: subscribeSlice,
        authUser: authSlice,
        searchBlog: searchSlice
    }
})

export default Store;