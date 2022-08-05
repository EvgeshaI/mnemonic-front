import React, {FC, useRef} from "react";
import s from "./navbar.module.css"
import {useNavigate} from "react-router";
import {deleteUser, setShowProfileModal} from "../../../store/authSlice";
import {useAppDispatch} from "../../../store";
import useClickOutside from "../../util/clickOutside";

type ModalListPropsType = {
    isAuth: boolean
    isMobileScreen: boolean
    searchConsonance: () => void
    setShowUserDropDown: (show: boolean) => void
    login: () => void
}

export const UserDropDown: FC <ModalListPropsType> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => props.setShowUserDropDown(false))

    const userPage = () => {
        navigate(`/user`)
        props.setShowUserDropDown(false)
    };
    const exit = () => {
        dispatch (deleteUser())
        navigate("/login")
        props.setShowUserDropDown(false)
    }
    const showProfileModal = () => {
        dispatch(setShowProfileModal(true))
        props.setShowUserDropDown(false)
    }
    const clickSearchConsonance = () => {
        props.setShowUserDropDown(false)
        props.searchConsonance();
    }
    const enter = () => {
        props.login()
        props.setShowUserDropDown(false)
    }
    return (
        <>
            {props.isMobileScreen ?
                    <div className={s.modalList} ref={ref}>
                        <div className={s.listStyle}><li onClick={clickSearchConsonance}>Созвучия</li></div>
                        {props.isAuth &&
                            <>
                                <div className={s.listStyle}><li onClick={userPage}>Мой словарь</li></div>
                                <div className={s.listStyle}><li onClick={showProfileModal}>Мой профиль</li></div>
                            </>
                        }
                        {props.isAuth ?
                            <div className={s.listStyle}><li onClick={exit}>Выйти</li></div>
                            :
                            <div className={s.listStyle}><li onClick={enter}>Войти</li></div>
                        }
                    </div>
                :
                    <div className={s.modalList} ref={ref}>
                        <div className={s.listStyle}><li onClick={userPage}>Мой словарь</li></div>
                        <div className={s.listStyle}><li onClick={showProfileModal}>Мой профиль</li></div>
                        <div className={s.listStyle}><li onClick={exit}>Выйти</li></div>
                    </div>
            }
        </>
    )
}
