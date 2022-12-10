import {ICalcAccuracyMnemo, IMnemonic, IPageElements} from "../shared/models/engWordTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import {showAndHideAlert} from "./alertsSlise";

interface MnemonicState {
    mnemonics: Array<IMnemonic>
    currentPage: number
    calcAccuracyMnemo: ICalcAccuracyMnemo | null
    hasMore: boolean
}

const initialState: MnemonicState = {
    mnemonics: [],
    currentPage: 0,
    calcAccuracyMnemo: null,
    hasMore: false
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
            setCalcAccuracyMnemo: (state, action: PayloadAction<ICalcAccuracyMnemo>) => {
                state.calcAccuracyMnemo = action.payload
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
    setCalcAccuracyMnemo
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
export const calcAccuracyAsync = (engWordId: number, mnemonicPhrase: string): AppThunk => async  (dispatch: any) => {
   let result = await MnemonicClient.calcAccuracy(engWordId, mnemonicPhrase);
    dispatch(setCalcAccuracyMnemo(result))
};
export default mnemonicSlice.reducer

