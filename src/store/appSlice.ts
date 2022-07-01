import {createSlice} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {getAndSetUser} from "./authSlice";


const initialState = {
    initialized: false
};


export const appSlice = createSlice (
    {
        name: 'app',
        initialState,
        reducers: {
            successInit: (state) => {
                state.initialized = true
            }
        }
    }
)

export const {
    successInit
} = appSlice.actions

export const initializedAppAsync = (): AppThunk => (dispatch: any) => {
    dispatch(getAndSetUser())
    dispatch(successInit())
}


export default appSlice.reducer;