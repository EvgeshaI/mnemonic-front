import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEngWord, IExample, IMnemonic} from "../shared/models/engWordTypes";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {addAlert, removeAlert} from "./alertsSlise";

interface EngWordState {
    engWord: IEngWord | null,
    mnemonics: Array<IMnemonic>
    checkedExample: IExample | null
    examples: Array<IExample>
    updateExample: IExample | null
}

const initialState: EngWordState = {
    engWord: null,
    mnemonics: [],
    examples: [],
    checkedExample: null,
    updateExample: null,
};

export const engWordSlice = createSlice(
    {
        name: 'engWord',
        initialState,
        reducers: {
            getEngWord: (state, action: PayloadAction<IEngWord> ) => {
                state.engWord = action.payload
            },
            getMnemonics: (state, action: PayloadAction<Array<IMnemonic>> ) => {
                state.mnemonics = action.payload
            },
            updateExampleExist: (state, action: PayloadAction<{mnemonicId: number, flag: boolean}>) => {
               state.mnemonics = state.mnemonics.map(el => {
                    if (el.mnemonicId === action.payload.mnemonicId){
                        el.exampleExists = action.payload.flag
                    }
                    return el
                })
            },
            getExamples: (state, action: PayloadAction<Array<IExample>>) =>{
                state.examples = action.payload
            },

            addMnemonicLike: (state, action: PayloadAction<number>) => {
                let mnemonicId = action.payload;
                let mnemonicLike = state.mnemonics.find(m => m.mnemonicId === mnemonicId);
                if (mnemonicLike) {
                    mnemonicLike.likes = mnemonicLike.likes + 1;
                    mnemonicLike.isLiked = true
                }
            },
            deleteMnemonicLike: (state, action: PayloadAction<number>) => {
                let mnemonicId = action.payload;
                let mnemonicLike = state.mnemonics.find(m => m.mnemonicId === mnemonicId);
                if (mnemonicLike) {
                    mnemonicLike.likes = mnemonicLike.likes - 1;
                    mnemonicLike.isLiked = false
                }
            },
            postExampleLike: (state, action: PayloadAction<number>) => {
                let exampleId = action.payload;
                let exampleLike = state.examples.find(m => m.exampleId === exampleId);
                if (exampleLike) {
                    exampleLike.likes = exampleLike.likes + 1;
                    exampleLike.liked = true
                }
            },
            deleteExampleLike: (state, action: PayloadAction<number>) => {
                let exampleId = action.payload;
                let exampleLike = state.examples.find(m => m.exampleId === exampleId);
                if (exampleLike) {
                    exampleLike.likes = exampleLike.likes - 1;
                    exampleLike.liked = false
                }
            },
            updateMnemonic: (state, action:PayloadAction<IMnemonic>) => {
                const updatedMnemonic = action.payload;
                state.mnemonics = state.mnemonics.map(m => {
                    if (m.mnemonicId === updatedMnemonic.mnemonicId) {
                        return updatedMnemonic
                    }
                    return m
                })
            },
            deleteMnemonic: (state, action:PayloadAction<number>) => {
                let deleteMnemonicId = action.payload;
                state.mnemonics = state.mnemonics.filter(m => m.mnemonicId !== deleteMnemonicId)
            },
            addMeMnemonic: (state, action: PayloadAction<number>) => {
                let mnemonicId = action.payload;
                let mnemonica = state.mnemonics.find(m => m.mnemonicId === mnemonicId);
                if(mnemonica){
                    mnemonica.added = true
                }
            },
            deleteMeMnemonic: (state, action:PayloadAction<number> ) => {
                let mnemonicId = action.payload;
                let mnemonica = state.mnemonics.find(m => m.mnemonicId === mnemonicId);
                if(mnemonica){
                    mnemonica.added = false
                }
            },
            clearCheckedExample: (state) => {
                state.checkedExample = null
            },
            deleteExample: (state, action: PayloadAction<number>) => {
                let deleteExampleId = action.payload;
                state.examples = state.examples.filter(e => e.exampleId !== deleteExampleId)

            },
            checkExample: (state, action: PayloadAction<IExample>) => {
                state.checkedExample = action.payload;
            },
            setUpdateExample: (state, action: PayloadAction<IExample>) => {
                state.updateExample = action.payload;
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
    getEngWord,
    checkExample,
    getMnemonics,
    updateExampleExist,
    getExamples,
    addMnemonicLike,
    deleteMnemonicLike,
    postExampleLike,
    deleteExampleLike,
    deleteMnemonic,
    addMeMnemonic,
    updateMnemonic,
    deleteMeMnemonic,
    clearCheckedExample,
    deleteExample,
    updateExample,
    setUpdateExample
} = engWordSlice.actions;

export const getEngWordAsync = (word:string): AppThunk => async (dispatch: any) => {
    let result = await MnemonicClient.getEngWord(word);
    dispatch(getMnemonicAsync(result.id));
    dispatch(getExampleAsync(result.id));
    dispatch(getEngWord(result))
};

export const getMnemonicAsync = (id:number): AppThunk => async (dispatch: any) => {
    let pageResult = await MnemonicClient.getMnemonic(id);
    dispatch(getMnemonics(pageResult.elements))
};

export const getExampleAsync = (id:number): AppThunk => async (dispatch: any) => {
    let result = await MnemonicClient.getExample(id);
    dispatch(getExamples(result.elements))
};
export const addMnemonicLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.postMnemonicLike(id);
    dispatch (addMnemonicLike(id))
};
export const addExampleLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.postExampleLike(id);
    dispatch (postExampleLike(id))
};
export const deleteMnemonicLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.deleteMnemonicLike(id);
    dispatch (deleteMnemonicLike(id))
};
export const deleteExampleLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.deleteExampleLike(id);
    dispatch(deleteExampleLike(id))
};

export const addMnemonicAsync = (engWordId: number, phrase:string, hl:Array<number>): AppThunk => async (dispatch: any) => {
    try {
        await MnemonicClient.addMnemonic(engWordId, phrase, hl);
        dispatch(getMnemonicAsync(engWordId))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error?.data?.data?.message}));
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
};

export const updateMnemonicAsync = (mnemonicId: number, mnemonicPhrase: string, highlight: Array<number>): AppThunk => async (dispatch: any) => {
    try {
        const response = await MnemonicClient.updateMnemonic(mnemonicId, mnemonicPhrase, highlight);
        dispatch(updateMnemonic(response))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error?.data?.data?.message}));
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}

export const deleteMnemonicAsync = (id:number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.deleteMnemonic(id);
    dispatch(deleteMnemonic(id))
};


export const addMeMnemonicAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.addMeMnemonic(id);
    dispatch(addMeMnemonic(id))
};

export const deleteMeMnemonicAsync = (id: number): AppThunk => async  (dispatch: any) => {
    await MnemonicClient.deleteMeMnemonic(id);
    dispatch(deleteMeMnemonic(id))
};

export const checkExampleForCreateAsync = (engWordId: number, sentence: string): AppThunk =>
    async (dispatch: any) => {
    try {
        let check = await MnemonicClient.checkExample(null, engWordId, sentence);
        dispatch(checkExample(check))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
};

// todo delete duplicates
export const checkExampleForUpdateAsync = (sentence: string): AppThunk =>
    async (dispatch: any, getState) => {
        try {
            let checkedExample = getState().engWordReducer.updateExample;
            let check = await MnemonicClient.checkExample(checkedExample!.exampleId, checkedExample!.engWordId, sentence);
            dispatch(setUpdateExample(check))
        } catch (error) {
            // @ts-ignore
            dispatch(addAlert({message: error.data?.data?.message}))
            setTimeout(() => dispatch(removeAlert()), 5000)
        }
    };


export const checkExampleTranslationAsync = (translationId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().engWordReducer.checkedExample;
        let check = await MnemonicClient.checkExample(null, checkedExample!.engWordId, checkedExample!.sentence, translationId);
        dispatch(checkExample(check))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}

export const checkExampleTranslationForUpdateAsync = (translationId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().engWordReducer.updateExample;
        let check = await MnemonicClient.checkExample(null, checkedExample!.engWordId, checkedExample!.sentence, translationId);
        dispatch(setUpdateExample(check))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}

export const checkExampleMnemonicAsync = (mnemonicId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().engWordReducer.checkedExample;
        let check = await MnemonicClient.checkExample(null, checkedExample!.engWordId, checkedExample!.sentence, checkedExample!.translationId, mnemonicId);
        dispatch(checkExample(check))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}
export const checkExampleMnemonicForUpdateAsync = (mnemonicId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().engWordReducer.updateExample;
        let check = await MnemonicClient.checkExample(null, checkedExample!.engWordId, checkedExample!.sentence, checkedExample!.translationId, mnemonicId);
        dispatch(setUpdateExample(check))
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}

export const saveExampleAsync = (newExample: IExample): AppThunk => async  (dispatch: any) => {
    try{
        await MnemonicClient.saveExample(newExample);
        dispatch(getExampleAsync(newExample.engWordId));
        dispatch (clearCheckedExample())
        dispatch(updateExampleExist({mnemonicId: newExample.mnemonicId!, flag: true}))
    }catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
};

export const updateExampleAsync = (example: IExample): AppThunk => async (dispatch: any) => {
    let response = await MnemonicClient.updateExample(example);
    dispatch(updateExample(response))
}

export const deleteExampleAsync = (id: number): AppThunk => async  (dispatch: any) => {
    await MnemonicClient.deleteExample(id);
    dispatch(deleteExample(id))
};

export default engWordSlice.reducer