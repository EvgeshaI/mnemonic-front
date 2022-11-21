import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEngWord, IEngWordSuggest, IVocabulary, LetterAndVocabulary} from "../shared/models/engWordTypes";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {getMnemonicAsync} from "./mnemonicSlice";
import {getExampleAsync} from "./exampleSlice";
import {setFetching} from "./appSlice";
import {showAndHideAlert} from "./alertsSlise";

interface EngWordState {
    engWord: IEngWord | null,
    suggestions: Array<IEngWordSuggest>,
    // engWordVocabulary: IEngWordVocabulary | null
    engWordVocabulary: Array<LetterAndVocabulary>
}

const initialState: EngWordState = {
    engWord: null,
    suggestions: [],
    // engWordVocabulary: null
    engWordVocabulary: []
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
            setVocabulary: (state, action: PayloadAction<Array<LetterAndVocabulary>>) => {
                state.engWordVocabulary = action.payload
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

export const getEngWordVocabulary = ():AppThunk => async  (dispatch: any) => {
    let result = await MnemonicClient.vocabulary()
    let map = new Map<string, Array<IVocabulary>>()
    for (let vocabulary of result.vocabulary){
        let key = vocabulary.engWord[0]
        if(map.has(key)){
            map.get(key)!.push(vocabulary)
        }else{
            map.set(key, [vocabulary])
        }
    }
    let letterAndVocabulary = [] as Array<LetterAndVocabulary>
    map.forEach((value: Array<IVocabulary>, key: string) => {
        letterAndVocabulary.push({letter: key, vocabularies: value})
    });
    dispatch(setVocabulary(letterAndVocabulary))
}


export default engWordSlice.reducer

