import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IExample, IPageElements} from "../shared/models/engWordTypes";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {showAndHideAlert} from "./alertsSlise";
import {updateExampleExist} from "./mnemonicSlice";
import {getReadyToPractice} from "./appSlice";

interface ExampleState {
    checkedExample: IExample | null
    examples: Array<IExample>
    // updateExample: IExample | null
    updateExamples: Array<IExample>
    currentPage: number
    hasMore: boolean
}

const initialState: ExampleState = {
    examples: [],
    checkedExample: null,
    // updateExample: null,
    currentPage: 0,
    hasMore: false,
    updateExamples: []
};

export const exampleSlice = createSlice(
    {
        name: 'example',
        initialState,
        reducers: {
            getExamples: (state, action: PayloadAction<IPageElements<IExample>>) =>{
                state.examples = [...state.examples, ...action.payload.elements]
                state.currentPage = state.currentPage +1
                state.hasMore = state.currentPage < action.payload.totalPages
            },
            resetExample: (state) => {
                state.examples = []
                state.currentPage = 0
                state.hasMore =false
            },
            postExampleLike: (state, action: PayloadAction<number>) => {
                let exampleId = action.payload;
                let exampleLike = state.examples.find(m => m.exampleId === exampleId);
                if (exampleLike) {
                    exampleLike.likes = exampleLike.likes + 1;
                    exampleLike.isLiked = true
                }
            },
            deleteExampleLike: (state, action: PayloadAction<number>) => {
                let exampleId = action.payload;
                let exampleLike = state.examples.find(m => m.exampleId === exampleId);
                if (exampleLike) {
                    exampleLike.likes = exampleLike.likes - 1;
                    exampleLike.isLiked = false
                }
            },
            clearCheckedExample: (state) => {
                state.checkedExample = null
            },
            clearUpdateExample: (state, action: PayloadAction<number>) => {
                state.updateExamples = state.updateExamples.filter(el => el.exampleId !== action.payload)
            },
            deleteExample: (state, action: PayloadAction<number>) => {
                let deleteExampleId = action.payload;
                state.examples = state.examples.filter(e => e.exampleId !== deleteExampleId)

            },
            addMeExample: (state, action: PayloadAction<number>) => {
                let exampleId = action.payload;
                let example = state.examples.find(e => e.exampleId === exampleId);
                if(example){
                    example.added = true
                }
            },
            deleteMeExample: (state, action:PayloadAction<number> ) => {
                let exampleId = action.payload;
                let example = state.examples.find(e => e.exampleId === exampleId);
                if(example){
                    example.added = false
                }
            },
            checkExample: (state, action: PayloadAction<IExample>) => {
                state.checkedExample = action.payload;
            },
            // setUpdateExample: (state, action: PayloadAction<IExample>) => {
            //     state.updateExample = action.payload;
            // },
            addUpdateExample:(state, action: PayloadAction<IExample>) => {
                state.updateExamples = [...state.updateExamples, action.payload]
            },
            updateExample: (state, action: PayloadAction<IExample>) => {
                let newExample = action.payload
                state.examples = state.examples.map(ex => {
                    if(ex.exampleId === newExample.exampleId){
                        ex = newExample
                    }
                    return ex
                })
            }
        }
    }
);

export const {
    checkExample,
    getExamples,
    resetExample,
    postExampleLike,
    deleteExampleLike,
    clearCheckedExample,
    clearUpdateExample,
    addMeExample,
    deleteMeExample,
    deleteExample,
    updateExample,
    addUpdateExample,
} = exampleSlice.actions;

export const getExampleAsync = (id:number): AppThunk => async (dispatch: any, getState) => {
    const exampleReducer = getState().exampleReducer
    let currentPage = exampleReducer.currentPage
    let result = await MnemonicClient.getExample(id, currentPage);
    dispatch(getExamples(result))
};
export const addExampleLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.postExampleLike(id);
    dispatch (postExampleLike(id))
};
export const deleteExampleLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.deleteExampleLike(id);
    dispatch(deleteExampleLike(id))
};


export const checkExampleForCreateAsync = (engWordId: number, sentence: string): AppThunk =>
    async (dispatch: any) => {
        dispatch(doCheckExample(null, engWordId, sentence))
    };

export const checkExampleTranslationAsync = (translationId: number): AppThunk => async (dispatch: any, getState) => {
    let checkedExample = getState().exampleReducer.checkedExample;
    dispatch(doCheckExample(null, checkedExample!.engWordId, checkedExample!.sentence, translationId))
}

export const checkExampleMnemonicAsync = (mnemonicId: number): AppThunk => async (dispatch: any, getState) => {
    let checkedExample = getState().exampleReducer.checkedExample;
    dispatch(doCheckExample(null, checkedExample!.engWordId, checkedExample!.sentence, checkedExample!.translationId, mnemonicId))
}

const doCheckExample = (exampleId: number | null,
                        engWordId: number,
                        sentence: string,
                        translationId?: number | null,
                        mnemonicId?: number | null): AppThunk => async (dispatch: any) => {
    try {
        let check = await MnemonicClient.checkExample(exampleId, sentence, engWordId, translationId, mnemonicId);
        dispatch(checkExample(check))
    } catch (error) {
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
    }
}

export const checkExampleForUpdateAsync = (exampleId: number, sentence: string): AppThunk =>
    async (dispatch: any) => {
        dispatch(doSetUpdateExample(exampleId, sentence))
    };

export const checkExampleTranslationForUpdateAsync = (exampleId: number, translationId: number): AppThunk => async (dispatch: any, getState) => {
    let checkedExample = getState().exampleReducer.updateExamples.find(el => el.exampleId === exampleId);
    dispatch(doSetUpdateExample(null, checkedExample!.sentence, checkedExample!.engWordId, translationId))
}

export const checkExampleMnemonicForUpdateAsync = (exampleId: number, mnemonicId: number): AppThunk => async (dispatch: any, getState) => {
    let checkedExample = getState().exampleReducer.updateExamples.find(el => el.exampleId === exampleId);
    dispatch(doSetUpdateExample(null, checkedExample!.sentence, checkedExample!.engWordId, checkedExample!.translationId, mnemonicId))
}

const doSetUpdateExample = (exampleId: number | null,
                        sentence: string,
                        engWordId?: number,
                        translationId?: number | null,
                        mnemonicId?: number | null): AppThunk => async (dispatch: any) => {
    try {
        let check = await MnemonicClient.checkExample(exampleId, sentence, engWordId, translationId, mnemonicId);
        dispatch(addUpdateExample(check))
    } catch (error) {
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
    }
}

export const saveExampleAsync = (newExample: IExample): AppThunk => async  (dispatch: any) => {
    try{
        await MnemonicClient.saveExample(newExample);
        dispatch(resetExample())
        dispatch(getExampleAsync(newExample.engWordId));
        dispatch (clearCheckedExample())
        dispatch(updateExampleExist({mnemonicId: newExample.mnemonicId!, flag: true}))
        dispatch(getReadyToPractice())
    }catch (error) {
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
    }
};

export const updateExampleAsync = (example: IExample): AppThunk => async (dispatch: any) => {
    let response = await MnemonicClient.updateExample(example);
    dispatch(updateExample(response))
}

export const deleteExampleAsync = (id: number): AppThunk => async  (dispatch: any) => {
    await MnemonicClient.deleteExample(id);
    dispatch(deleteExample(id))
    dispatch(getReadyToPractice())
};
export const addMeExampleAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.addMeExample(id);
    dispatch(addMeExample(id))
};
export const deleteMeExampleAsync = (id: number): AppThunk => async  (dispatch: any) => {
    await MnemonicClient.deleteMeExample(id);
    dispatch(deleteMeExample(id))
};

export default exampleSlice.reducer

