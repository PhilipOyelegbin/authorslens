import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import authSlice from "./authSlice";
import subscribeSlice from "./subscribeSlice";

const Store = configureStore({
    reducer: {
        blogs: blogSlice,
        subscribe: subscribeSlice,
        authUser: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export default Store;