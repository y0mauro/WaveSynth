

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DelayState ={value:number}
const initialState :DelayState = {value:0}

const delaySliceRight = createSlice({
    name: 'delay',
        initialState,
    reducers: {
        setDelayRight(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setDelayRight } = delaySliceRight.actions
export {setDelayRight}
export default delaySliceRight.reducer