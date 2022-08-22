import React, {FC, useRef} from "react";
import s from "./navbar.module.scss"
import {useNavigate} from "react-router";
import {deleteUser, setShowProfileModal} from "../../../store/authSlice";
import {useAppDispatch} from "../../../store";
import useClickOutside from "../../util/clickOutside";
import {ReactComponent as Book} from "../../../import/icons/book.svg";
import {ReactComponent as Dumbbell} from "../../../import/icons/dumbbell.svg";
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
    const goWorkout = () => {
        navigate(`/practice`)
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
                        <div className={s.listStyle} onClick={clickSearchConsonance}>
                            <div className={s.icon}><Sound/></div>
                            <li>Созвучия</li>
                        </div>
                        {props.isAuth &&
                            <>
                                <div className={s.listStyle} onClick={userPage}>
                                    <div className={s.icon}><Book/></div>
                                    <li>Мой словарь</li>
                                </div>
                                <div className={s.listStyle} onClick={goWorkout}>
                                    <div className={s.icon}><Dumbbell/></div>
                                    <li>Тренировка</li>
                                </div>
                                <div className={s.listStyle} onClick={showProfileModal}>
                                    <div className={s.icon}><Profile/></div>
                                    <li>Мой профиль</li>
                                </div>
                            </>
                        }
                        {props.isAuth ?
                            <div className={s.listStyle} onClick={exit}>
                                <div className={s.icon}><Logout/></div>
                                <li>Выйти</li>
                            </div>
                            :
                            <div className={s.listStyle} onClick={enter}>
                                <div className={s.icon}><Login/></div>
                                <li>Войти</li>
                            </div>
                        }
                    </div>
                :
                    <div className={s.modalList} ref={ref}>
                        <div className={s.listStyle} onClick={userPage}>
                            <div className={s.icon}><Book/></div>
                            <li>Мой словарь</li>
                        </div>
                        <div className={s.listStyle} onClick={goWorkout}>
                            <div className={s.icon}><Dumbbell/></div>
                            <li>Тренировка</li>
                        </div>
                        <div className={s.listStyle} onClick={showProfileModal}>
                            <div className={s.icon}><Profile/></div>
                            <li>Мой профиль</li>
                        </div>
                        <div className={s.listStyle} onClick={exit}>
                            <div className={s.icon}><Logout/></div>
                            <li>Выйти</li>
                        </div>
                    </div>
            }
        </>
    )
}
