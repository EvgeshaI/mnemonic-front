import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {IExampleHome, IExampleHomePage} from "../shared/models/engWordTypes";

interface ExampleHome {
    examplesHomePage: IExampleHomePage | null
    examples: Array<IExampleHome>
    hasMoreExamplesHome: boolean
}

const initialState: ExampleHome = {
    examplesHomePage: null,
    examples: [],
    hasMoreExamplesHome: true
};

export const homePageSlice = createSlice(
    {
        name: 'homePage',
        initialState,
        reducers: {
            getExampleForHomePage: (state, action:PayloadAction<Array<IExampleHome>>) => {
                state.examples = action.payload
            },
            hasMoreExamples: (state, action: PayloadAction<boolean>) =>{
                state.hasMoreExamplesHome = action.payload
            }
        },
    }
)

export const {
    getExampleForHomePage,
    hasMoreExamples
} = homePageSlice.actions

export const getExampleForHomePageAsync = (excludeIds: Array<number>):AppThunk => async (dispatch: any) => {
    let result = await MnemonicClient.exampleHomePage(excludeIds)
    dispatch(getExampleForHomePage(result.examples))
    dispatch(hasMoreExamples(result.hasMore))
}


export default homePageSlice.reducer;