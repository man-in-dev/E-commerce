import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItem: JSON.parse(localStorage.getItem("E-commerce-prac-cart")) || []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItem = [action.payload, ...state.cartItem];
            localStorage.setItem("E-commerce-prac-cart", JSON.stringify(state.cartItem));
        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter(c => c.item._id !== action.payload);
            localStorage.setItem("E-commerce-prac-cart", JSON.stringify(state.cartItem));
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer