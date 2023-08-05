

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DelayState ={value:number}
const initialState :DelayState = {value:0}

const delaySlice = createSlice({
    name: 'delay',
        initialState,
    reducers: {
        setDelay(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setDelay } = delaySlice.actions
export {setDelay}
export default delaySlice.reducer