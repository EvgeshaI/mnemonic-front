import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import engWordReducer from './engWordSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertReducer from "./alertsSlise";

export const store = configureStore( {
    reducer: {
        engWordReducer: engWordReducer,
        alertReducer: alertReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, RootState, any, Action<string>>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
