import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import authSlice from "./authSlice";

const Store = configureStore({
    reducer: {
        blogs: blogSlice,
        authUser: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export default Store;