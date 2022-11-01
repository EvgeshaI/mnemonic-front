import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {LengthAndWords} from "../shared/models/engWordTypes";

interface ConsonanceState {
    consonances: Array<LengthAndWords>
    searchConsonances: string
}

const initialState: ConsonanceState = {
    consonances: [],
    searchConsonances: ""
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
            }
        }
    }
)

export const {
    setConsonance,
    clearConsonance,
    setSearchConsonance
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