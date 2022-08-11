import React, {useEffect} from "react";
import s from "./auth.module.scss";
import {ReactComponent as VKontakte} from "../../../import/icons/vk.svg"
import {useAppDispatch} from "../../../store";
import {vkLoginAsync} from "../../../store/authSlice";
import {useLocation} from "react-router-dom";

export const VKLogin = () => {
    let dispatch = useAppDispatch()

    const redirectUrl =  process.env.REACT_APP_VK_REDIRECT_URL;
    const handleRedirect = () => {
        window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=popup&redirect_uri=${redirectUrl}&scope=email&response_type=code&v=5.131`;
    };
    const code = new URLSearchParams(useLocation().search).get('code') || ''
    useEffect(() => {
        if(code.length > 0) {
            dispatch(vkLoginAsync(code))
        }
    }, [code])
    return (
        <div className={s.vkBox} onClick={handleRedirect}>
           <div className={s.vkLogo}> <VKontakte/></div>
            <div className={s.vkText}>Вход через аккаунт ВК</div>
        </div>
    )
}