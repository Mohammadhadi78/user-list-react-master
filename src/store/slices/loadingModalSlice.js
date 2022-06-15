import { createSlice } from "@reduxjs/toolkit";

const loadingModalSlice = createSlice ({
    name : 'loadingModalSlice',
    initialState : {
        value : true
    },
    reducers: {
        reduxShowLoading : (state , action) =>{
            // console.log(action.payload);
            state.value = action.payload
        }
    }
})

// console.log(loadingModalSlice);
export const {reduxShowLoading } = loadingModalSlice.actions;

export default loadingModalSlice.reducer;