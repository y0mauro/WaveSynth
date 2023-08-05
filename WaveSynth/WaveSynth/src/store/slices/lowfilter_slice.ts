

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState ={value:number}
const initialState :FilterState = {value:0}

const lowfilterSlice = createSlice({
    name: 'lowfilter',
        initialState,
    reducers: {
        setLow(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setLow } = lowfilterSlice.actions
export {setLow}
export default lowfilterSlice.reducer