

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState ={value:number}
const initialState :FilterState = {value:0}

const midfilterSliceRight = createSlice({
    name: 'midfilter',
        initialState,
    reducers: {
        setMidRight(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setMidRight } = midfilterSliceRight.actions
export {setMidRight}
export default midfilterSliceRight.reducer