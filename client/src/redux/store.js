import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";
import signinSlice from "./signinSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
    reducer: {
        signupData: signupSlice,
        signinData: signinSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
});