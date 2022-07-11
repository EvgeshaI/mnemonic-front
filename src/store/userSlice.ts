import {IExample, IPageElements, IStudy, NewStudyExample} from "../shared/models/engWordTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MnemonicClient} from "../api/MnemonicClient";
import {AppThunk} from "./index";
import {addAlert, removeAlert} from "./alertsSlise";


interface UserState {
    studies: Array<IStudy>
    createMyExample: IExample | null
    createExampleMap: Array<NewStudyExample>
    currentPage: number
    hasMore: boolean,
    search: string
}

const initialState: UserState = {
    studies: [],
    createMyExample: null,
    hasMore: false,
    currentPage: 0,
    search: '',
    createExampleMap: []
};

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            setUserPage: (state, action: PayloadAction<IPageElements<IStudy>>) => {
                state.studies = [...state.studies, ...action.payload.elements]
                state.currentPage = state.currentPage + 1
                if (state.currentPage < action.payload.totalPages){
                    state.hasMore = true
                }else {
                    state.hasMore = false
                }
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
            // нахуевертила
            setMyExample: (state, action: PayloadAction<{studyId: number, example: IExample | null}>) => {
                let studyId = action.payload.studyId;
                let example = action.payload.example;
                let foundExample = state.createExampleMap.find(el => el.studyId === studyId)
                if (foundExample) {
                    state.createExampleMap = state.createExampleMap.map(el => {
                        if(el.studyId === studyId){
                            el.example = action.payload.example!;
                        }
                        return el
                    })
                } else {
                    if(example) {
                        const newExample:NewStudyExample = {studyId, example}
                        state.createExampleMap = [...state.createExampleMap, newExample]
                    } else {
                        state.createExampleMap = state.createExampleMap.filter(el => el.studyId !== studyId)
                    }
                }
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
            deleteNewExample: (state, action: PayloadAction<number>) => {
                let studyId = action.payload
                state.createExampleMap = state.createExampleMap.filter(el => el.studyId !== studyId)
            }
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
    deleteNewExample
} = userSlice.actions


export const getMyPageAsync = (search: string): AppThunk => async (dispatch: any, getState) => {
    const userReducer = getState().userReducer;
    if (userReducer.search !== search) {
        let result = await MnemonicClient.myPage(0, search);
        dispatch(setCurrentSearch({page:0, search}))
        dispatch(setNewUserPage(result))
    } else {
        const currentPage = userReducer.currentPage
        let result = await MnemonicClient.myPage(currentPage, search);
        dispatch(setUserPage(result))
    }

};

export const checkMyExampleAsync = (engWordId: number, sentence: string, mnemonicId: number, studyId:number): AppThunk =>
    async (dispatch: any) => {
    try {
        let check = await MnemonicClient.checkExample(null, engWordId, sentence, null, mnemonicId);
        dispatch(setMyExample({studyId: studyId, example: check}))
    }catch (error){
        //@ts-ignore
        dispatch(addAlert({message: error.data?.data?.message}))
        setTimeout(() => dispatch(removeAlert()), 5000)
    }
    };

export const checkMyExampleTranslationAsync = (translationId: number, studyId: number): AppThunk => async (dispatch: any, getState) => {
    try {
        let checkedExample = getState().userReducer.createMyExample;
        let check = await MnemonicClient.checkExample(
            null,
            checkedExample!.engWordId,
            checkedExample!.sentence,
            translationId,
            checkedExample!.mnemonicId
        );
        dispatch(setMyExample({studyId: studyId, example: check})) //нахуевертила здесь (добавила studyId)
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



export default userSlice.reducer;