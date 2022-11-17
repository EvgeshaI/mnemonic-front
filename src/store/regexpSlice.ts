import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {LengthAndWords, SelectedWord} from "../shared/models/engWordTypes";

interface ConsonanceState {
    consonances: Array<LengthAndWords>
    searchConsonances: string
    consonanceWords: Array<SelectedWord>
}

const initialState: ConsonanceState = {
    consonances: [],
    searchConsonances: "",
    consonanceWords: []
};

export const regexpSlice = createSlice(
    {
        name: 'regexp',
        initialState,
        reducers: {
            setConsonance:(state, action: PayloadAction<Array<LengthAndWords>>) => {
                state.consonances = action.payload
            },
            clearConsonance: (state) => {
                state.consonances = []
            },
            setSearchConsonance : (state,  action: PayloadAction<string>) => {
                state.searchConsonances = action.payload
            },
            addSelectedWords: (state,  action: PayloadAction<SelectedWord>) => {
                if(!state.consonanceWords.map(el => el.word).includes(action.payload.word)){
                    state.consonanceWords = [...state.consonanceWords, action.payload]
                }
            },
            deleteConsonanceWords: (state,  action: PayloadAction<string>) => {
                let word = action.payload
                state.consonanceWords = state.consonanceWords.filter(el => el.word !== word)
            }
        }
    }
)

export const {
    setConsonance,
    clearConsonance,
    setSearchConsonance,
    addSelectedWords,
    deleteConsonanceWords
} = regexpSlice.actions

export const findByRegexpAsync = (regexp: string, onlyInit: boolean):AppThunk => async (dispatch: any) => {
    let result = await MnemonicClient.findConsonance(regexp, onlyInit)
    let map = new Map<number, Array<string>>()
    for (let word of result){
        let key = word.length
        if(map.has(key)){
            map.get(key)!.push(word)
        }else{
            map.set(key, [word])
        }
    }
    let lengthAndWords = [] as Array<LengthAndWords>
    map.forEach((value: Array<string>, key: number) => {
        lengthAndWords.push({length: key, words: value})
    });
    dispatch(setConsonance(lengthAndWords.sort((a,b) => a.length - b.length)))
}

export default regexpSlice.reducer;