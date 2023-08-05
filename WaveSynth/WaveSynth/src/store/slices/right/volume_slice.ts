

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type VolumeState ={value:number}
const initialState :VolumeState = {value:0.5}

const volumeSliceRight = createSlice({
    name: 'volume',
        initialState,
    reducers: {
        setVolumeRight(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

const { setVolumeRight } = volumeSliceRight.actions
export {setVolumeRight}
export default volumeSliceRight.reducer