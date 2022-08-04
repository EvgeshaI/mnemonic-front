import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEngWord} from "../shared/models/engWordTypes";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {getMnemonicAsync} from "./mnemonicSlice";
import {getExampleAsync} from "./exampleSlice";
import {setFetching} from "./appSlice";
import {showAndHideAlert} from "./alertsSlise";

interface EngWordState {
    engWord: IEngWord | null,
}

const initialState: EngWordState = {
    engWord: null,
};

export const engWordSlice = createSlice(
    {
        name: 'engWord',
        initialState,
        reducers: {
            getEngWord: (state, action: PayloadAction<IEngWord> ) => {
                state.engWord = action.payload

            }
        }
    }
);

export const {
    getEngWord
} = engWordSlice.actions;

export const getEngWordAsync = (word:string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setFetching(true))
        let result = await MnemonicClient.getEngWord(word);
        dispatch(getMnemonicAsync(result.id));
        dispatch(getExampleAsync(result.id));
        dispatch(getEngWord(result))
        dispatch(setFetching(false))
    }catch (error){
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
        dispatch(setFetching(false))
    }
};

export default engWordSlice.reducer

