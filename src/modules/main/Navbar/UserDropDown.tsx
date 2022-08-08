import React, {FC, useRef} from "react";
import s from "./navbar.module.css"
import {useNavigate} from "react-router";
import {deleteUser, setShowProfileModal} from "../../../store/authSlice";
import {useAppDispatch} from "../../../store";
import useClickOutside from "../../util/clickOutside";
import {ReactComponent as Book} from "../../../import/icons/book.svg";
import {ReactComponent as Profile} from "../../../import/icons/profile.svg";
import {ReactComponent as Logout} from "../../../import/icons/logout.svg";
import {ReactComponent as Sound} from "../../../import/icons/sound.svg";
import {ReactComponent as Login} from "../../../import/icons/login.svg";

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
                        <div className={s.listStyle}>
                            <div className={s.icon}><Sound/></div>
                            <li onClick={clickSearchConsonance}>Созвучия</li>
                        </div>
                        {props.isAuth &&
                            <>
                                <div className={s.listStyle}>
                                    <div className={s.icon}><Book/></div>
                                    <li onClick={userPage}>Мой словарь</li>
                                </div>
                                <div className={s.listStyle}>
                                    <div className={s.icon}><Profile/></div>
                                    <li onClick={showProfileModal}>Мой профиль</li>
                                </div>
                            </>
                        }
                        {props.isAuth ?
                            <div className={s.listStyle}>
                                <div className={s.icon}><Logout/></div>
                                <li onClick={exit}>Выйти</li>
                            </div>
                            :
                            <div className={s.listStyle}>
                                <div className={s.icon}><Login/></div>
                                <li onClick={enter}>Войти</li>
                            </div>
                        }
                    </div>
                :
                    <div className={s.modalList} ref={ref}>
                        <div className={s.listStyle}>
                            <div className={s.icon}><Book/></div>
                            <li onClick={userPage}>Мой словарь</li>
                        </div>
                        <div className={s.listStyle}>
                            <div className={s.icon}><Profile/></div>
                            <li onClick={showProfileModal}>Мой профиль</li>
                        </div>
                        <div className={s.listStyle}>
                            <div className={s.icon}><Logout/></div>
                            <li onClick={exit}>Выйти</li>
                        </div>
                    </div>
            }
        </>
    )
}
