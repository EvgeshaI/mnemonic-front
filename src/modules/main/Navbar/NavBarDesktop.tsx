import s from "./navbar.module.scss";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg";
import {ReactComponent as LogoDark} from "../../../import/icons/logoForDark.svg";
import {ReactComponent as Sound} from "../../../import/icons/sound.svg";
import {ReactComponent as Dictionary} from "../../../import/icons/dictionary.svg";
import {ReactComponent as User} from "../../../import/icons/user.svg";
import {ReactComponent as Login} from "../../../import/icons/login.svg";
import {ReactComponent as Moon} from "../../../import/icons/moon.svg";
import {ReactComponent as Sun} from "../../../import/icons/sun.svg";
import React, {FC} from "react";
import {IUser} from "../../../shared/models/engWordTypes";
import {EngWordAutosuggest} from "./EngWordAutosuggest";
import Toggle from "react-toggle";
import {useAppDispatch, useAppSelector} from "../../../store";
import {updateTheme} from "../../../store/appSlice";

type NavBarDesktopPropsType = {
    isAuth: boolean
    user: IUser | null
    goToVocabulary: () => void
    startPage: () => void
    searchConsonance: () => void
    invertShowDropDown: () => void
    login: () => void
}

export const NavBarDesktop:FC<NavBarDesktopPropsType> = (props) => {
    const {
        isDarkTheme,
        readyToPractice
    } = useAppSelector((state) => state.appReducer);
    const dispatch = useAppDispatch()
    const changeTheme = () => {
        dispatch(updateTheme(!isDarkTheme))
    }

    return (
        <div className={s.navbar}>
            <div className={s.logo} onClick={props.startPage}>
                {isDarkTheme ? <LogoDark/> : <Logo/>}
            </div>
            <div className={s.search}>
                <EngWordAutosuggest transWidth={30}/>
            </div>
            <div className={s.nicknameAndLogout}>
                <div className={s.toggleTheme}>
                    <Toggle
                        checked={isDarkTheme}
                        icons={{
                            checked: <Sun/>,
                            unchecked: <Moon/>,
                        }}
                        onChange={changeTheme}/>
                </div>
                <div className={s.Box} onClick={props.searchConsonance}>
                    <div className={s.navbarIcon}>
                        <Sound/>
                    </div>
                    <div>Созвучия</div>
                </div>
                <div className={s.Box} onClick={props.goToVocabulary}>
                    <div className={s.navbarIcon}>
                        <Dictionary/>
                    </div>
                    <div>Словарь</div>
                </div>
                {props.isAuth ?
                    <div onClick={() => props.invertShowDropDown()}
                         className={s.Box} id={"dropDown"}>
                        <div className={s.navbarIcon}>
                            <User/>
                        </div>
                        <div>{props.user!.nickname}</div>
                        {readyToPractice > 0 &&
                            <div className={s.readeToPractice}>{readyToPractice}</div>
                        }
                    </div>
                    :
                    <div onClick={props.login} className={s.logText}>
                        <div className={s.logIcon}><Login/></div>
                        <div className={s.logout}>Войти</div>
                    </div>
                }
            </div>
        </div>
    )
}