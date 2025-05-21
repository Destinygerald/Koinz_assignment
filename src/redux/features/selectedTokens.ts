import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ISelectedTokens {
    value: number[]
}

const initialState: ISelectedTokens = {
    value: []
}

const selectedTokenSlice = createSlice({
    name: 'selectedTokens',
    initialState,
    reducers: {
        clearTokens: (state) => {
            state.value = []
        },
        addToken: (state, actions:PayloadAction<number>) => {
            state.value.push(actions.payload)
        },
        removeToken: (state, actions:PayloadAction<number>) => {
            state.value = state.value.filter(value => value != actions.payload)
        },
        addAllToken: (state, actions:PayloadAction<number[]>) => {
            state.value = []
            
            actions.payload.forEach(value => {
                state.value.push(value)
            })

        }
    }
})

export const { clearTokens, addAllToken, addToken, removeToken } = selectedTokenSlice.actions
export default selectedTokenSlice.reducer