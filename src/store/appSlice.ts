import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {getAndSetUser} from "./authSlice";
import {MnemonicClient} from "../api/MnemonicClient";

interface appState {
    initialized: boolean,
    isFetching: boolean,
    isDarkTheme: boolean,
    readyToPractice: number
}
const initialState: appState = {
    initialized: false,
    isFetching: false,
    isDarkTheme: false,
    readyToPractice: 0
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
            },
            setReadyToPractice: (state, action: PayloadAction<number>) => {
                state.readyToPractice = action.payload
            }
        }
    }
)

export const {
    successInit,
    setFetching,
    setTheme,
    setReadyToPractice
} = appSlice.actions

export const initializedAppAsync = (): AppThunk => (dispatch: any) => {
    const theme = JSON.parse(localStorage.getItem("isDarkTheme") || "false") as boolean
    dispatch(setTheme(theme))
    dispatch(getAndSetUser())
    dispatch(getReadyToPractice())
    dispatch(successInit())
}
export const updateTheme = (theme:boolean):AppThunk => (dispatch:any) => {
    dispatch(setTheme(theme))
    localStorage.setItem("isDarkTheme", JSON.stringify(theme))
}
export const getReadyToPractice = (): AppThunk => async (dispatch: any) => {
    let result =  await MnemonicClient.readyToPractice()
    dispatch(setReadyToPractice(result.readyToPractice))
}

export default appSlice.reducer;