import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: 0,
    isConnected : false,
    prevStatus : false
}

const connectionSlice = createSlice({
    name:'ApplicatonConnection',
    initialState,
    reducers:{
        increment:(state,action)=>{
            // console.log("Action1 ", action)
        },
        networkStatus:(state,action)=>{
            state.isConnected = action.payload;
        },
        oldNetworkStatusHandler:(state,action)=>{
            state.prevStatus = action.payload;
            console.log("Previos Network Updated", action);
        }

    }
})

export const {increment,networkStatus,oldNetworkStatusHandler} = connectionSlice.actions;
export default connectionSlice.reducer;