import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../config/Baseurl";

export const signup = createAsyncThunk(
    "signup", async (signupData) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/api/v1/user/signup`, signupData);
            localStorage.setItem("E-commerce-prac", JSON.stringify({ user: data?.user, token: data?.token }));
            return data;

        } catch (error) {
            return error.response.data
        }
    }
);

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    token: ""
}

const signupSlice = createSlice({
    name: "signupSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default signupSlice.reducer