import s from "./navbar.module.scss";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg";
import {ReactComponent as Sound} from "../../../import/icons/sound.svg";
import {ReactComponent as User} from "../../../import/icons/user.svg";
import {ReactComponent as Login} from "../../../import/icons/login.svg";
import React, {FC} from "react";
import {IUser} from "../../../shared/models/engWordTypes";
import {EngWordAutosuggest} from "./EngWordAutosuggest";

type NavBarDesktopPropsType = {
    isAuth: boolean
    user: IUser | null
    startPage: () => void
    searchConsonance: () => void
    invertShowDropDown: () => void
    login: () => void
}

export const NavBarDesktop:FC<NavBarDesktopPropsType> = (props) => {
    return (
        <div className={s.navbar}>
            <div className={s.logo} onClick={props.startPage}>
                <Logo/>
            </div>
            <div className={s.search}>
                <EngWordAutosuggest transWidth={30}/>
            </div>
            <div className={s.nicknameAndLogout}>
                <div className={s.Box} onClick={props.searchConsonance}>
                    <div className={s.navbarIcon}>
                        <Sound/>
                    </div>
                    <div>Созвучия</div>
                </div>
                {props.isAuth ?
                    <div onClick={() => props.invertShowDropDown()}
                         className={s.Box} id={"dropDown"}>
                        <div className={s.navbarIcon}>
                            <User/>
                        </div>
                        <div>{props.user!.nickname}</div>

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