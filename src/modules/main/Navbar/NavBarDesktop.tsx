import s from "./navbar.module.css";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg";
import {ReactComponent as Search} from "../../../import/icons/search.svg";
import {ReactComponent as Sound} from "../../../import/icons/sound.svg";
import {ReactComponent as User} from "../../../import/icons/user.svg";
import {ReactComponent as Login} from "../../../import/icons/login.svg";
import React, {FC} from "react";
import {IUser} from "../../../shared/models/engWordTypes";

type NavBarDesktopPropsType = {
    isAuth: boolean
    user: IUser | null
    word: string
    startPage: () => void
    goToWord: () => void
    searchWord: (e: React.ChangeEvent<HTMLInputElement>) => void
    pressHandler: (e: React.KeyboardEvent) => void
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
                <div className={s.inputAndIcon}>
                    <div className={s.searchIcon}
                         onClick={props.goToWord}>
                        <Search/>
                    </div>
                    <input type="text"
                           placeholder="поиск..."
                           className={s.searchInput}
                           value={props.word}
                           onChange={props.searchWord}
                           onKeyPress={props.pressHandler}
                    />
                </div>
            </div>
            <div className={s.nicknameAndLogout}>
                <div className={s.Box} onClick={props.searchConsonance}>
                    <div>Созвучия</div>
                    <div className={s.userIcon}>
                        <Sound/>
                    </div>
                </div>
                {props.isAuth ?
                    <div onClick={() => props.invertShowDropDown()}
                         className={s.usernameBox} id={"dropDown"}>
                        <div>{props.user!.nickname}</div>
                        <div className={s.userIcon}>
                            <User/>
                        </div>
                    </div>
                    :
                    <div onClick={props.login} className={s.logText}>
                        <div className={s.logout}>Войти</div>
                        <div className={s.logIcon}><Login/></div>
                    </div>
                }
            </div>
        </div>
    )
}