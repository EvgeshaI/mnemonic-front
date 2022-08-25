import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import engWordReducer from './engWordSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertReducer from "./alertsSlise";
import authReducer from "./authSlice";
import appReducer from "./appSlice";
import userReducer from "./userSlice";
import mnemonicReducer from "./mnemonicSlice"
import exampleReducer from "./exampleSlice"
import regexpReducer from "./regexpSlice"
import practiceReducer from "./practiceSlice"
import homePageReducer from "./homePageSlice"

export const store = configureStore( {
    reducer: {
        engWordReducer: engWordReducer,
        mnemonicReducer: mnemonicReducer,
        exampleReducer: exampleReducer,
        alertReducer: alertReducer,
        authReducer: authReducer,
        appReducer: appReducer,
        userReducer: userReducer,
        regexpReducer: regexpReducer,
        practiceReducer: practiceReducer,
        homePageReducer: homePageReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, RootState, any, Action<string>>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
