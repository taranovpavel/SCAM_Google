import { configureStore } from "@reduxjs/toolkit";
import telegramReducer from "./telegramSlice"

export const store = configureStore({
    reducer: {
        telegramReducer
    }
});