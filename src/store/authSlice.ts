import {IUser} from "../shared/models/engWordTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./index";
import {MnemonicClient} from "../api/MnemonicClient";
import jwt_decode from "jwt-decode"
import {showAndHideAlert} from "./alertsSlise";
import {getReadyToPractice} from "./appSlice";


interface LoginState {
    user: null | IUser
    isAuth: boolean
    errorMessage: string | null,
    isUpdateNickname: boolean
    confirmed: boolean | null
    nicknameError: string | null,
    showProfileModal: boolean
}

const initialState: LoginState = {
    user: null,
    isAuth: false,
    errorMessage: null,
    isUpdateNickname: false,
    confirmed: null,
    nicknameError: null,
    showProfileModal: false
};

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            setUser:(state, action: PayloadAction <IUser>) => {
                state.user = action.payload
                state.isAuth = true
                state.errorMessage = null
            },
            removeUser:(state) => {
                state.user = null
                state.isAuth = false
            },
            setError: (state, action: PayloadAction <string | null>) => {
                state.errorMessage = action.payload
            },
            setConfirmed: (state, action: PayloadAction<boolean>) => {
                state.confirmed = action.payload
            },
            setNicknameError: (state, action: PayloadAction<string | null>) => {
                state.nicknameError = action.payload
            },
            setShowProfileModal: (state, action: PayloadAction<boolean>) =>{
                state.showProfileModal =action.payload
            },
            setIsUpdateNickname: (state, action: PayloadAction<boolean>) => {
                state.isUpdateNickname = action.payload
            }
        }
    }
)

export const {
    setUser,
    removeUser,
    setError,
    setConfirmed,
    setNicknameError,
    setShowProfileModal,
    setIsUpdateNickname
} = authSlice.actions

export const getAndSetUser = () => (dispatch: any) => {
    let user = JSON.parse(localStorage.getItem("user") || "null") as IUser
    if (user) {
        dispatch(setUser(user))
        dispatch(getReadyToPractice())
    }
}

export const deleteUser = () => (dispatch: any) => {
    localStorage.removeItem("user")
    dispatch(removeUser ())
}

export const signUpAsync = (nickname: string, email: string, password: string): AppThunk => async  (dispatch: any) => {
    try {
        let response = await MnemonicClient.signUp (nickname, email, password)
        let user = extractUser(response.accessToken)
        dispatch(setUser(user))
        localStorage.setItem("user", JSON.stringify(user))
    } catch (error){
        // @ts-ignore
        const message = error.data.data.message
        dispatch(setError(message))
    }
}

export const updateUserName = (nickname: string):AppThunk => async (dispatch: any) => {
    try {
        let response = await MnemonicClient.updateNickname(nickname)
        let user = extractUser(response.accessToken)
        dispatch(setUser(user))
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(setShowProfileModal(false))
        dispatch(setIsUpdateNickname(false))
    } catch (error) {
        // @ts-ignore
        if (error.data.status === 409){
            dispatch(setIsUpdateNickname(true))
            // @ts-ignore
            showAndHideAlert(dispatch, error.data.data.message)
        }
    }
}

export const authUserAsync = ( email: string, password: string): AppThunk => async  (dispatch: any) => {
    try {
        let response = await MnemonicClient.authUser ( email, password)
        let user = extractUser(response.accessToken)
        dispatch(setUser(user))
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(getReadyToPractice())
    } catch (error) {
        // @ts-ignore
        const message = error.data.data.message
        dispatch(setError(message))
    }
}

type JwtDecodeUserType = {
    email: string,
    scope: string,
    nickname: string,
    confirmed: boolean
}

const extractUser = (token: string) => {
    const {email, scope, nickname, confirmed} = jwt_decode<JwtDecodeUserType> (token)
    return {
        email,
        nickname,
        token,
        role: scope,
        confirmed
    }
}

export const restorePasswordAsync = (email: string): AppThunk => async () => {
   await MnemonicClient.resetPassword(email)
}

export const changePasswordAsync = (token: string, password: string): AppThunk => async () => {
    await MnemonicClient.changePassword(token, password)
}

export const googleLoginAsync = (token: string): AppThunk => async (dispatch: any) => {
   try {
        let response = await MnemonicClient.googleLoginSuccess(token)
        let user = extractUser(response.accessToken)
        dispatch(setUser(user))
        localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
        // @ts-ignore
        const message = error.data.data.message
        dispatch(setError(message))
    }
}
export const vkLoginAsync = (code: string): AppThunk => async (dispatch: any) => {
    try {
        let response = await MnemonicClient.vkLoginSuccess(code)
        let user = extractUser(response.accessToken)
        dispatch(setUser(user))
        localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
        // @ts-ignore
        const message = error.data.data.message
        dispatch(setError(message))
    }
}


export const emailConfirmationAsync = (token: string): AppThunk => async (dispatch:any) => {
    try{
        await MnemonicClient.emailConfirmation(token)
        let user = JSON.parse(localStorage.getItem("user") || "null")  as IUser
        if(user) {
            dispatch(deleteUser())
        }
        dispatch(setConfirmed(true))
    } catch (error) {
        dispatch(setConfirmed(false))
    }
}

export default authSlice.reducer;