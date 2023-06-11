import { configureStore } from "@reduxjs/toolkit";
import sliceOne from "./CartSlice";
const StoreCart = configureStore({ reducer: { cart: sliceOne.reducer } });

export default StoreCart;
