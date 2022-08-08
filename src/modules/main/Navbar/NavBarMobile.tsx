import React, {FC} from "react";
import s from "./navBarMobile.module.css";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg";
import {ReactComponent as Burger} from "../../../import/icons/burger-bar.svg";
import {IUser} from "../../../shared/models/engWordTypes";
import {EngWordAutosuggest} from "./EngWordAutosuggest";

type NavBarMobilePropsType = {
    isAuth: boolean
    user: IUser | null
    startPage: () => void
    login: () => void
    invertShowDropDown: () => void
}

export const NavBarMobile:FC<NavBarMobilePropsType> = (props) => {
    return (
        <div className={s.navbar}>
            <div className={s.logoAndBurger}>
                <div className={s.logo} onClick={props.startPage}>
                    <Logo/>
                </div>
                <div className={s.burger} onClick={props.invertShowDropDown} id={"dropDown"}><Burger/></div>
            </div>
            <EngWordAutosuggest transWidth={20}/>
        </div>
    )
}