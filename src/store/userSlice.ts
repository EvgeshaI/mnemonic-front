import {IExample, IPageElements, IStatistic, IStudy, NewStudyExample} from "../shared/models/engWordTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MnemonicClient} from "../api/MnemonicClient";
import {AppThunk} from "./index";
import {addAlert, removeAlert} from "./alertsSlise";
import {setFetching} from "./appSlice";


interface UserState {
    studies: Array<IStudy>
    createExampleMap: Array<NewStudyExample>
    currentPage: number
    hasMore: boolean,
    search: string,
    statistic: IStatistic | null
}

const initialState: UserState = {
    studies: [],
    hasMore: false,
    currentPage: 0,
    search: '',
    createExampleMap: [],
    statistic: null
};

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            setUserPage: (state, action: PayloadAction<IPageElements<IStudy>>) => {
                state.studies = [...state.studies, ...action.payload.elements]
                state.currentPage = state.currentPage + 1
                state.hasMore = state.currentPage < action.payload.totalPages;
            },
            setNewUserPage: (state, action: PayloadAction<IPageElements<IStudy>>) => {
                state.studies = action.payload.elements
                state.currentPage = state.currentPage + 1
                if (state.currentPage < action.payload.totalPages){
                    state.hasMore = true
                }else {
                    state.hasMore = false
                }
            },
            setCurrentSearch: (state, action: PayloadAction<{page: number, search: string}>) => {
                state.currentPage = action.payload.page
                state.search = action.payload.search
            },

            setMyExample: (state, action: PayloadAction<{engWordId: number, example: IExample | null}>) => {
                let engWordId = action.payload.engWordId;
                let example = action.payload.example;
                let foundExample = state.createExampleMap.find(el => el.engWordId === engWordId)
                if (foundExample) {
                    state.createExampleMap = state.createExampleMap.map(el => {
                        if(el.engWordId === engWordId){
                            el.example = action.payload.example!;
                        }
                        return el
                    })
                } else {
                    if(example) {
                        const newExample:NewStudyExample = {engWordId, example}
                        state.createExampleMap = [...state.createExampleMap, newExample]
                    } else {
                        state.createExampleMap = state.createExampleMap.filter(el => el.engWordId !== engWordId)
                    }
                }
            },
            updateStudyExample: (state, action: PayloadAction<{ engWordId: number, example: IExample }>) => {
                let engWordId = action.payload.engWordId;
                let example = action.payload.example;
                state.studies = state.studies.map(el => {
                    if (el.engWord.id === engWordId) {
                        el.examples = [...el.examples]
                        el.examples.push({
                            id: example.exampleId,
                            mnemonicId: example.mnemonicId,
                            likes: example.likes,
                            parts: example.parts,
                            created: example.created
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
            removeMyMnemonic: (state, action: PayloadAction<number>) => {
                state.studies = state.studies.map(s => {
                   s.mnemonics = s.mnemonics.filter(el => el.id !== action.payload)
                    return s
               })
            },
            searchMnemo: (state, action: PayloadAction<IPageElements<IStudy>>) => {
                 state.studies = action.payload.elements
            },
            deleteNewExample: (state, action: PayloadAction<number>) => {
                let engWordId = action.payload
                state.createExampleMap = state.createExampleMap.filter(el => el.engWordId !== engWordId)
            },
            initUserPageState: (state) => {
                state.studies = [];
                state.hasMore = false;
                state.currentPage = 0;
                state.createExampleMap = []
            },
            setMyStatistic: (state, action: PayloadAction<IStatistic>) => {
                state.statistic = action.payload;
            },
        }
    }
)

export const {
    setUserPage,
    setNewUserPage,
    setCurrentSearch,
    setMyExample,
    updateStudyExample,
    removeMyExample,
    removeMyMnemonic,
    deleteNewExample,
    initUserPageState,
    setMyStatistic
} = userSlice.actions


export const getMyPageAsync = (search: string): AppThunk => async (dispatch: any, getState) => {
    const userReducer = getState().userReducer;
    dispatch(setFetching(true))
    if (userReducer.search !== search) {
        let result = await MnemonicClient.myPage(0, search);
        dispatch(setCurrentSearch({page:0, search}))
        dispatch(setNewUserPage(result))
    } else {
        const currentPage = userReducer.currentPage
        let result = await MnemonicClient.myPage(currentPage, search);
        dispatch(setUserPage(result))
    }
    dispatch(setFetching(false))
};

export const checkMyExampleAsync = (engWordId: number, sentence: string): AppThunk =>
    async (dispatch: any) => {
    try {
        let check = await MnemonicClient.checkExample(null, sentence, engWordId, null, null);
        dispatch(setMyExample({engWordId: engWordId, example: check}))
    }catch (error){
        //@ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
    };

export const checkMyExampleTranslationAsync = (translationId: number, engWordId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().userReducer.createExampleMap.find(el => el.engWordId === engWordId)!.example;
        let check = await MnemonicClient.checkExample(
            null,
            checkedExample.sentence,
            checkedExample.engWordId,
            translationId,
            checkedExample!.mnemonicId
        );
        dispatch(setMyExample({engWordId: engWordId, example: check})) //нахуевертила здесь (добавила studyId)
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
}

export const saveMyExampleAsync = (engWordId:number, example: IExample): AppThunk => async  (dispatch: any) => {
    try {
        let result = await MnemonicClient.saveExample(example)
        dispatch(updateStudyExample({engWordId, example: result}))
        dispatch(getMyStatisticAsync())
    } catch (error) {
        // @ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }

}

export const deleteMyExampleAsync = (myExampleId:number): AppThunk => async  (dispatch: any) => {
     await MnemonicClient.deleteExample(myExampleId)
    dispatch(removeMyExample(myExampleId))
    dispatch(getMyStatisticAsync())
}

export const deleteThisMnemonicAsync = (mnemonicID: number): AppThunk => async (dispatch: any) => {
    await MnemonicClient.deleteMeMnemonic(mnemonicID)
    dispatch(removeMyMnemonic(mnemonicID))
}
export const getMyStatisticAsync = (): AppThunk => async (dispatch: any) => {
   let result =  await MnemonicClient.getStatistic()
    dispatch(setMyStatistic(result))
}


export default userSlice.reducer;