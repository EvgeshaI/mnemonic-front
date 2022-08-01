import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {getAndSetUser} from "./authSlice";


const initialState = {
    initialized: false,
    isFetching: false
};


export const appSlice = createSlice (
    {
        name: 'app',
        initialState,
        reducers: {
            successInit: (state) => {
                state.initialized = true
            },
            setFetching: (state, action: PayloadAction<boolean>) => {
                state.isFetching = action.payload
            }
        }
    }
)

export const {
    successInit,
    setFetching
} = appSlice.actions

export const initializedAppAsync = (): AppThunk => (dispatch: any) => {
    dispatch(getAndSetUser())
    dispatch(successInit())
}


export default appSlice.reducer;