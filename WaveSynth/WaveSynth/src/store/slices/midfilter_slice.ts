

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState ={value:number}
const initialState :FilterState = {value:0}

const midfilterSlice = createSlice({
    name: 'midfilter',
        initialState,
    reducers: {
        setMid(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setMid } = midfilterSlice.actions
export {setMid}
export default midfilterSlice.reducer