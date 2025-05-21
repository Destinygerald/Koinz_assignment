import { configureStore } from "@reduxjs/toolkit";
import selectedTokens from './features/selectedTokens'
import availableTokens from './features/availableToken'

export const store = configureStore({
    reducer: {
        selectedTokens,
        availableTokens
    } 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;