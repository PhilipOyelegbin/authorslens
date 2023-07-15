import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseAPI } from '../api';

const initialState = {loading: false, regUser: [], logUser: [], token: [], error: ""}

// -----------registration request--------------------------
export const registerUser = createAsyncThunk('authentication/registerUser', async (data) => {
    const resp = await baseAPI.post("/users/", data);
    return resp.status;
})

// -----------login request--------------------------
export const loginUser = createAsyncThunk('authentication/loginUser', async (data) => {
    const resp = await baseAPI.post("/login", data);
    return resp.status;
})

// -----------token validation request--------------------------
export const authenticateUser = createAsyncThunk('authentication/authenticateUser', async (data) => {
    const resp = await baseAPI.post("/token/verify", data);
    return resp;
})

// -----------logout request--------------------------
export const logoutUser = createAsyncThunk('authentication/logoutUser', async (data) => {
    const resp = await baseAPI.post("/token/logout", data, {
        headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
    });
    return resp;
})

const authSlice = createSlice({
    name: "authentication",
    initialState,
    extraReducers: (builder) => {
        // ----------------signup---------------
        builder.addCase(registerUser.pending, (state)=>{state.loading = true}),
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.regUser = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(registerUser.rejected, (state, action)=>{
            state.loading = false,
            state.regUser = [],
            state.error = action.error.message
        })
        // -------------------login---------------------
        builder.addCase(loginUser.pending, (state)=>{state.loading = true}),
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.logUser = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
            state.logUser = [],
            state.error = action.error.message
        })
        // ---------------authenticate------------------
        builder.addCase(authenticateUser.pending, (state)=>{state.loading = true}),
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.token = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false,
            state.token = [],
            state.error = action.error.message
        }),
        // ---------------logout------------------
        builder.addCase(logoutUser.pending, (state)=>{state.loading = true}),
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.error?.message) {
                state.error = ""
                state.token = action.payload
            } else {
                state.error = action.error.message
            }
        }),
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false,
            state.token = [],
            state.error = action.error.message
        })
    }
});

export default authSlice.reducer;