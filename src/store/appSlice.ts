import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {getAndSetUser} from "./authSlice";

interface appState {
    initialized: boolean,
    isFetching: boolean,
    isDarkTheme: boolean
}
const initialState: appState = {
    initialized: false,
    isFetching: false,
    isDarkTheme: false
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
            },
            setTheme: (state, action:PayloadAction<boolean>) => {
                state.isDarkTheme = action.payload
            }
        }
    }
)

export const {
    successInit,
    setFetching,
    setTheme
} = appSlice.actions

export const initializedAppAsync = (): AppThunk => (dispatch: any) => {
    const theme = JSON.parse(localStorage.getItem("isDarkTheme") || "false") as boolean
    dispatch(setTheme(theme))
    dispatch(getAndSetUser())
    dispatch(successInit())
}
export const updateTheme = (theme:boolean):AppThunk => (dispatch:any) => {
    dispatch(setTheme(theme))
    localStorage.setItem("isDarkTheme", JSON.stringify(theme))
}

export default appSlice.reducer;