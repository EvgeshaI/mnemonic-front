import React, {useEffect} from "react";
import {googleLoginAsync} from "../../../store/authSlice";
import {useAppDispatch} from "../../../store";
import s from "./auth.module.css";


export const GoogleLogin = () => {
    let dispatch = useAppDispatch()
    let onSuccessGoogleLogin = (res: any) => {
        if (!res.clientId || !res.credential) return
        dispatch(googleLoginAsync(res.credential))
    }
    useEffect(() => {
        /* global google */
        // @ts-ignore
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: onSuccessGoogleLogin
        })
        // @ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }, []);
    return (
        <div className={s.googleBox}>
            <div className={s.googleLogin}>
                <div id="signInDiv"> </div>
            </div>
        </div>
    )
}