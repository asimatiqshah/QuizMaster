import { combineReducers } from "@reduxjs/toolkit";
import connectionSlice from "./connectionSlice";
const rootReducer = combineReducers({
    connectionSlice : connectionSlice
})
export default rootReducer;