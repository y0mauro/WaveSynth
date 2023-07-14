

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState ={value:number}
const initialState :FilterState = {value:0}

const highfilterSliceRight = createSlice({
    name: 'highfilter',
        initialState,
    reducers: {
        setHighRight(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setHighRight } = highfilterSliceRight.actions
export {setHighRight}
export default highfilterSliceRight.reducer