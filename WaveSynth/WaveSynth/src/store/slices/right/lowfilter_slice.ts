

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState ={value:number}
const initialState :FilterState = {value:0}

const lowfilterSliceRight = createSlice({
    name: 'lowfilter',
        initialState,
    reducers: {
        setLowRight(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setLowRight } = lowfilterSliceRight.actions
export {setLowRight}
export default lowfilterSliceRight.reducer