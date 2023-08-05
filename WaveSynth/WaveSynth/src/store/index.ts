import { configureStore } from "@reduxjs/toolkit";
import volume_slice from "./slices/volume_slice";

import lowfilter_slice from "./slices/lowfilter_slice";
import midfilter_slice from "./slices/midfilter_slice";
import highfilter_slice from "./slices/highfilter_slice";
import delay_slice from "./slices/delay_slice";
import lowfilter_sliceright from "./slices/right/lowfilter_slice";
import midfilter_sliceright from "./slices/right/midfilter_slice";
import highfilter_sliceright from "./slices/right/highfilter_slice";
import volume_sliceright from "./slices/right/volume_slice";
import delay_sliceright from "./slices/right/delay_slice";
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
const store = configureStore({
    reducer: {
        volumeReducer:volume_slice,
        lowFilterReducer:lowfilter_slice,
        midFilterReducer:midfilter_slice,
        highFilterReducer:highfilter_slice,
        delayReducer:delay_slice,
        volumeReducerRight:volume_sliceright,
        lowFilterReducerRight:lowfilter_sliceright,
        midFilterReducerRight:midfilter_sliceright,
        highFilterReducerRight:highfilter_sliceright,
        delayReducerRight:delay_sliceright,
        
    }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;