import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const availableTokens = createSlice({
    name: 'availableTokens',
    initialState: {
        value: [] as any[]
    },
    reducers: {
        setAvailableTokens: (state, actions:PayloadAction<any>) => {
            state.value = [...actions.payload]
        }
    }
})

export const { setAvailableTokens } = availableTokens.actions;
export default availableTokens.reducer;