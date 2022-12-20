import {ICalcAccuracyMnemo, ICalcAccuracyMnemoWithId, IMnemonic, IPageElements} from "../shared/models/engWordTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {showAndHideAlert} from "./alertsSlise";

interface MnemonicState {
    mnemonics: Array<IMnemonic>
    currentPage: number
    calcAccuracyCreateMnemo: ICalcAccuracyMnemo
    calcAccuracyUpdateMnemo: ICalcAccuracyMnemoWithId
    hasMore: boolean
}

const initialState: MnemonicState = {
    mnemonics: [],
    currentPage: 0,
    calcAccuracyCreateMnemo: {
        mnemonicPhrase: "",
        accuracy: 0,
        highlight: []
    },
    calcAccuracyUpdateMnemo: {
        mnemonicId: -1,
        mnemonicPhrase: "",
        accuracy: 0,
        highlight: []
    },
    hasMore: false,
};

export const mnemonicSlice = createSlice(
    {
        name: 'mnemonic',
        initialState,
        reducers: {
            getMnemonics: (state, action: PayloadAction<IPageElements<IMnemonic>> ) => {
                state.mnemonics = [...state.mnemonics, ...action.payload.elements]
                state.currentPage = state.currentPage + 1
                state.hasMore = state.currentPage < action.payload.totalPages
            },
            resetMnemonic: (state) => {
                state.currentPage = 0
                state.hasMore = false
                state.mnemonics = []
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
                let mnemonic = state.mnemonics.find(m => m.mnemonicId === mnemonicId);
                if(mnemonic){
                    mnemonic.added = true
                }
            },
            deleteMeMnemonic: (state, action:PayloadAction<number> ) => {
                let mnemonicId = action.payload;
                let mnemonic = state.mnemonics.find(m => m.mnemonicId === mnemonicId);
                if(mnemonic){
                    mnemonic.added = false
                }
            },
            updateExampleExist: (state, action: PayloadAction<{mnemonicId: number, flag: boolean}>) => {
                state.mnemonics = state.mnemonics.map(el => {
                    if (el.mnemonicId === action.payload.mnemonicId){
                        el.exampleExists = action.payload.flag
                    }
                    return el
                })
            },
            setCalcAccuracyCreateMnemo: (state, action: PayloadAction<ICalcAccuracyMnemo>) => {
                state.calcAccuracyCreateMnemo = action.payload
            },
            updateCalcAccuracyCreateMnemo: (state, action: PayloadAction<string>) => {
                state.calcAccuracyCreateMnemo = {
                    mnemonicPhrase: action.payload,
                    accuracy: 0,
                    highlight: []
                }
            },
            updateCreateHighlight: (state, action: PayloadAction<number>) => {
                state.calcAccuracyCreateMnemo!.highlight = [...state.calcAccuracyCreateMnemo!.highlight, action.payload].sort()
            },
            deleteCreateHighlight: (state, action: PayloadAction<number>) => {
                state.calcAccuracyCreateMnemo!.highlight = state.calcAccuracyCreateMnemo!.highlight.filter(el => el !== action.payload)
            },
            clearCreateHighlight: (state) => {
                state.calcAccuracyCreateMnemo!.highlight =[]
                state.calcAccuracyCreateMnemo!.accuracy = 0
            },
            updateCreateAccuracy: (state, action:PayloadAction<number>) => {
                state.calcAccuracyCreateMnemo.accuracy = action.payload
            },
            clearCalcAccuracyMnemo: (state) => {
                state.calcAccuracyCreateMnemo = {
                    mnemonicPhrase: "",
                    accuracy: 0,
                    highlight: []
                }
            },
            setCalcAccuracyUpdateMnemo: (state, action: PayloadAction<ICalcAccuracyMnemoWithId>) => {
                state.calcAccuracyUpdateMnemo = action.payload
            },
            resetCalcAccuracyUpdateMnemo: (state) => {
                state.calcAccuracyUpdateMnemo = {
                    mnemonicId: -1,
                    mnemonicPhrase: "",
                    accuracy: 0,
                    highlight: []
                }
            },
            deleteUpdateHighlight: (state, action: PayloadAction<number>) => {
                state.calcAccuracyUpdateMnemo!.highlight = state.calcAccuracyUpdateMnemo!.highlight.filter(el => el !== action.payload)
            },
            updateCalcAccuracyUpdateMnemo: (state, action: PayloadAction<string>) => {
                state.calcAccuracyUpdateMnemo = {
                    mnemonicId: state.calcAccuracyUpdateMnemo!.mnemonicId,
                    mnemonicPhrase: action.payload,
                    accuracy: 0,
                    highlight: []
                }
            },
            clearUpdateHighlight: (state) => {
                state.calcAccuracyUpdateMnemo!.highlight =[]
                state.calcAccuracyUpdateMnemo!.accuracy = 0
            },
            updateHighlightUpdate: (state, action: PayloadAction<number>) => {
                state.calcAccuracyUpdateMnemo!.highlight = [...state.calcAccuracyUpdateMnemo!.highlight, action.payload].sort()
            },
            updateAccuracy: (state, action:PayloadAction<number>) => {
                state.calcAccuracyUpdateMnemo!.accuracy = action.payload
            }
        }
    }
);

export const {
    getMnemonics,
    resetMnemonic,
    addMnemonicLike,
    deleteMnemonicLike,
    deleteMnemonic,
    addMeMnemonic,
    updateMnemonic,
    deleteMeMnemonic,
    updateExampleExist,
    setCalcAccuracyCreateMnemo,
    updateCalcAccuracyCreateMnemo,
    updateCreateHighlight,
    deleteCreateHighlight,
    clearCreateHighlight,
    updateCreateAccuracy,
    clearCalcAccuracyMnemo,
    setCalcAccuracyUpdateMnemo,
    resetCalcAccuracyUpdateMnemo,
    deleteUpdateHighlight,
    updateCalcAccuracyUpdateMnemo,
    clearUpdateHighlight,
    updateHighlightUpdate,
    updateAccuracy
} = mnemonicSlice.actions;

export const getMnemonicAsync = (id:number): AppThunk => async (dispatch: any, getState) => {
    const mnemonicReducer = getState().mnemonicReducer
    let currentPage = mnemonicReducer.currentPage
    let pageResult = await MnemonicClient.getMnemonic(id, currentPage);
    dispatch(getMnemonics(pageResult))
};
export const addMnemonicLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.postMnemonicLike(id);
    dispatch (addMnemonicLike(id))
};
export const deleteMnemonicLikeAsync = (id: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.deleteMnemonicLike(id);
    dispatch (deleteMnemonicLike(id))
};

export const addMnemonicAsync = (engWordId: number, phrase:string, hl:Array<number>, accuracy: number): AppThunk => async (dispatch: any) => {
    try {
        await MnemonicClient.addMnemonic(engWordId, phrase, hl, accuracy);
        dispatch(resetMnemonic())
        dispatch(getMnemonicAsync(engWordId))
    } catch (error) {
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
    }
};

export const updateMnemonicAsync = (mnemonicId: number, mnemonicPhrase: string, highlight: Array<number>, accuracy: number): AppThunk => async (dispatch: any) => {
    try {
        const response = await MnemonicClient.updateMnemonic(mnemonicId, mnemonicPhrase, highlight, accuracy);
        dispatch(updateMnemonic(response))
    } catch (error) {
        // @ts-ignore
        showAndHideAlert(dispatch, error?.data?.data?.message)
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
export const calcAccuracyCreateAsync = (engWordId: number, mnemonicPhrase: string): AppThunk => async  (dispatch: any) => {
   let result = await MnemonicClient.calcAccuracy(engWordId, mnemonicPhrase);
    dispatch(setCalcAccuracyCreateMnemo(result))
};

export const calcAccuracyUpdateAsync = (engWordId: number, mnemonicId: number, mnemonicPhrase: string): AppThunk => async  (dispatch: any) => {
    let result = await MnemonicClient.calcAccuracy(engWordId, mnemonicPhrase);
    dispatch(setCalcAccuracyUpdateMnemo({...result, mnemonicId}))
};
export const initUpdateMnemonic = (engWordId: number, mnemonicId: number, mnemonicPhrase: string) => {

}
export default mnemonicSlice.reducer

