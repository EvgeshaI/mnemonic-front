import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";


export interface IAlert {
    message: string
}
export interface IAlertState {
    alert: IAlert | null
}

const initialState: IAlertState = {
    alert: null
};

export const alertSlice = createSlice( {
    name: 'alert',
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<IAlert>) => {
            state.alert = action.payload
        },
        removeAlert: (state) => {
            state.alert = null
        },
    }
});

export const {addAlert, removeAlert} = alertSlice.actions;
export default alertSlice.reducer;