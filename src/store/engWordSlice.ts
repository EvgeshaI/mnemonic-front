import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEngWord, IEngWordSuggest, IEngWordVocabulary} from "../shared/models/engWordTypes";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {getMnemonicAsync} from "./mnemonicSlice";
import {getExampleAsync} from "./exampleSlice";
import {setFetching} from "./appSlice";
import {showAndHideAlert} from "./alertsSlise";

interface EngWordState {
    engWord: IEngWord | null,
    suggestions: Array<IEngWordSuggest>,
    engWordVocabulary: IEngWordVocabulary | null,
    currentPage: number
}

const initialState: EngWordState = {
    engWord: null,
    suggestions: [],
    engWordVocabulary: null,
    currentPage: 0
};

export const engWordSlice = createSlice(
    {
        name: 'engWord',
        initialState,
        reducers: {
            setEngWord: (state, action: PayloadAction<IEngWord> ) => {
                state.engWord = action.payload

            },
            setEngWordAuto: (state, action: PayloadAction<Array<IEngWordSuggest>> ) => {
                state.suggestions = action.payload
            },
            setVocabulary: (state, action: PayloadAction<IEngWordVocabulary>) => {
                state.engWordVocabulary = {...state.engWordVocabulary, ...action.payload}
                state.currentPage = state.currentPage + 1
            }
        }
    }
);

export const {
    setEngWord,
    setEngWordAuto,
    setVocabulary
} = engWordSlice.actions;

export const getEngWordAsync = (word:string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setFetching(true))
        let result = await MnemonicClient.getEngWord(word);
        dispatch(getMnemonicAsync(result.id));
        dispatch(getExampleAsync(result.id));
        dispatch(setEngWord(result))
        dispatch(setFetching(false))
    }catch (error){
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
        dispatch(setFetching(false))
    }
};

export const getEngWordSuggestAsync = (word:string): AppThunk => async (dispatch: any) => {
    let result = await MnemonicClient.autoGetEngWord(word)
    dispatch(setEngWordAuto(result))
}

export const getEngWordVocabulary = ():AppThunk => async  (dispatch: any, getState) => {
    const engWordReducer = getState().engWordReducer
    let currentPage = engWordReducer.currentPage
    let result = await MnemonicClient.vocabulary(currentPage)
    dispatch(setVocabulary(result))
}


export default engWordSlice.reducer

