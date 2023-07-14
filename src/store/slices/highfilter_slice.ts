

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState ={value:number}
const initialState :FilterState = {value:0}

const highfilterSlice = createSlice({
    name: 'highfilter',
        initialState,
    reducers: {
        setHigh(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setHigh } = highfilterSlice.actions
export {setHigh}
export default highfilterSlice.reducer