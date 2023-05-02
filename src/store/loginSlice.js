import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {loading: false, user: [], error: ""}

export const getUser = createAsyncThunk("auth/getUser", async () => {
    const resp = await axios.get(import.meta.env.VITE_APP_LOGIN_ROUTE, data);
    return resp.data
})

const loginSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, state => state.loading = true),
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload
        }),
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false,
            state.user = [],
            state.error = action.error.message
        })
    }
})

export default loginSlice.reducer;