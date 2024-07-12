import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../config/Baseurl"

export const productsAction = createAsyncThunk("products", async () => {
    try {
        const { data } = await axios.get(`${BaseUrl}/api/v1/product`)
        return data?.products
    } catch (error) {
        return error.response.data
    }
});

const initialState = {
    isLoading: false,
    products: [],
    product: null,
    error: null
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    extraReducers: (builder) => [
        builder
            .addCase(productsAction.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(productsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload
            })
            .addCase(productsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    ]
});

export default productSlice.reducer;