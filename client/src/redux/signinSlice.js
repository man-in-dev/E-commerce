import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../config/Baseurl";

export const signin = createAsyncThunk(
    "signin", async (signinData) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/api/v1/user/signin`, signinData);
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
    user: JSON.parse(localStorage.getItem("E-commerce-prac"))?.user || null,
    token: JSON.parse(localStorage.getItem("E-commerce-prac"))?.token || ""
}

const signinSlice = createSlice({
    name: "signinSlice",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            state.token = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { logout } = signinSlice.actions;
export default signinSlice.reducer