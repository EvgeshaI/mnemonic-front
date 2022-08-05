import React, {FC} from "react";
import s from "./navBarMobile.module.css";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg";
import {ReactComponent as Search} from "../../../import/icons/search.svg";
import {ReactComponent as Burger} from "../../../import/icons/burger-bar.svg";
import {IUser} from "../../../shared/models/engWordTypes";

type NavBarMobilePropsType = {
    isAuth: boolean
    user: IUser | null
    word: string
    startPage: () => void
    goToWord: () => void
    searchWord: (e: React.ChangeEvent<HTMLInputElement>) => void
    pressHandler: (e: React.KeyboardEvent) => void
    login: () => void
    invertShowDropDown: () => void
}

export const NavBarMobile:FC<NavBarMobilePropsType> = (props) => {

    return (
        <>
            <div className={s.navbar}>
                <div className={s.logoAndBurger}>
                    <div className={s.logo} onClick={props.startPage}>
                        <Logo/>
                    </div>
                    <div className={s.burger} onClick={props.invertShowDropDown} id={"dropDown"}><Burger/></div>
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
                               value = {props.word}
                               onChange={props.searchWord}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}