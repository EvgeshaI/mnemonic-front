import {IExample, IPageElements, IStudy} from "../shared/models/engWordTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MnemonicClient} from "../api/MnemonicClient";
import {AppThunk} from "./index";
import {addAlert, removeAlert} from "./alertsSlise";


interface UserState {
    studies: Array<IStudy>
    createMyExample: IExample | null
}

const initialState: UserState = {
    studies: [],
    createMyExample: null,
};

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            setUserPage: (state, action: PayloadAction<Array<IStudy>>) => {
                state.studies = action.payload
            },
            setMyExample: (state, action: PayloadAction<IExample | null>) => {
                state.createMyExample = action.payload;
            },
            updateStudyExample: (state, action: PayloadAction<{ studyId: number, example: IExample }>) => {
                let studyId = action.payload.studyId;
                let example = action.payload.example;
                state.studies = state.studies.map(el => {
                    if (el.studyId === studyId) {
                        el.examples = [...el.examples,]
                        el.examples.push({
                            id: example.exampleId,
                            likes: example.likes,
                            parts: example.parts
                        })
                    }
                    return el
                })
            },
            removeMyExample: (state, action: PayloadAction<number>) => {
                let deleteMyExampleId = action.payload;
                state.studies.map(el => {
                    el.examples = el.examples.filter(ex => ex.id !== deleteMyExampleId)
                })
            },
            searchMnemo: (state, action: PayloadAction<IPageElements<IStudy>>) => {
                 state.studies = action.payload.elements
            },
        }
    }
)

export const {
    setUserPage,
    setMyExample,
    updateStudyExample,
    removeMyExample,
    searchMnemo
} = userSlice.actions


export const getMyPageAsync = (): AppThunk => async (dispatch: any) => {
     let result = await MnemonicClient.myPage();
     dispatch(setUserPage(result.elements))
};

export const checkMyExampleAsync = (engWordId: number, sentence: string, mnemonicId: number): AppThunk =>
    async (dispatch: any) => {
    try {
        let check = await MnemonicClient.checkExample(null, engWordId, sentence, null, mnemonicId);
        dispatch(setMyExample(check))
    }catch (error){
        //@ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
    };

export const checkMyExampleTranslationAsync = (translationId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().userReducer.createMyExample;
        let check = await MnemonicClient.checkExample(
            null,
            checkedExample!.engWordId,
            checkedExample!.sentence,
            translationId,
            checkedExample!.mnemonicId
        );
        dispatch(setMyExample(check))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}

export const saveMyExampleAsync = (studyId:number, example: IExample): AppThunk => async  (dispatch: any) => {
    let result = await MnemonicClient.saveExample(example)
    dispatch(updateStudyExample({studyId, example: result}))
}

export const deleteMyExampleAsync = (myExampleId:number): AppThunk => async  (dispatch: any) => {
     await MnemonicClient.deleteExample(myExampleId)
    dispatch(removeMyExample(myExampleId))
}

export const searchMyMnemoAsync = (word: string): AppThunk => async  (dispatch: any) => {
    let result = await MnemonicClient.searchMyMnemo(word)
    dispatch(searchMnemo(result))
}

export default userSlice.reducer;