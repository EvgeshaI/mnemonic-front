import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {IAwait, IPractice, IPracticeExample} from "../shared/models/engWordTypes";
import {MnemonicClient} from "../api/MnemonicClient";
import {setFetching} from "./appSlice";

interface PracticeState {
    examplesPractice: Array<IPracticeExample>
    hasExamples: boolean
    awaitingPractice: Array<IAwait>
}

const initialState: PracticeState = {
    examplesPractice: [],
    hasExamples: false,
    awaitingPractice: []
};


export const practiceSlice = createSlice(
    {
        name: 'practice',
        initialState,
        reducers: {
            getMyPractice:(state, action: PayloadAction<IPractice>) => {
                state.examplesPractice = action.payload.practices
                state.hasExamples = action.payload.hasExamples
            },
            getAwaitingPractice: (state, action: PayloadAction<Array<IAwait>>) =>{
                state.awaitingPractice = action.payload
            },
        }
    }
)

export const {
    getMyPractice,
    getAwaitingPractice
} = practiceSlice.actions

export const getPracticeAsync = ():AppThunk => async (dispatch: any) => {
    dispatch(setFetching(true))
    let result = await MnemonicClient.getPractice()
    dispatch(getMyPractice(result))
    dispatch(setFetching(false))
}
export const guessedAsync = (exampleId: number, guessed: boolean):AppThunk => async (dispatch: any) => {
    await MnemonicClient.practiceGuessed(exampleId, guessed)
}

export const tookHintAsync = (exampleId: number):AppThunk => async (dispatch: any) => {
    await MnemonicClient.tookHint(exampleId)
}
export const awaitingAsync = ():AppThunk => async (dispatch: any) => {
    dispatch(setFetching(true))
    let result = await MnemonicClient.await()
    dispatch(getAwaitingPractice(result))
    dispatch(setFetching(false))
}

export default practiceSlice.reducer;