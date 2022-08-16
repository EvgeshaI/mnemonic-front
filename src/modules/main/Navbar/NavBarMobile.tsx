import React, {FC} from "react";
import s from "./navBarMobile.module.scss";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg";
import {ReactComponent as LogoDark} from "../../../import/icons/logoForDark.svg";
import {ReactComponent as Burger} from "../../../import/icons/burger-bar.svg";
import {ReactComponent as Moon} from "../../../import/icons/moon.svg";
import {ReactComponent as Sun} from "../../../import/icons/sun.svg";
import {IUser} from "../../../shared/models/engWordTypes";
import {EngWordAutosuggest} from "./EngWordAutosuggest";
import Toggle from "react-toggle";
import {useAppDispatch, useAppSelector} from "../../../store";
import {updateTheme} from "../../../store/appSlice";

type NavBarMobilePropsType = {
    isAuth: boolean
    user: IUser | null
    startPage: () => void
    login: () => void
    invertShowDropDown: () => void
    // theme: string
    // toggleTheme: () => void
}

export const NavBarMobile:FC<NavBarMobilePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const {
        isDarkTheme,
    } = useAppSelector((state) => state.appReducer);
    const changeTheme = () => {
            dispatch(updateTheme(!isDarkTheme))
        }
    return (
        <div className={s.navbar}>
            <div className={s.logoAndBurger}>
                <div className={s.logo} onClick={props.startPage}>
                    {isDarkTheme ? <LogoDark/> : <Logo/>}
                </div>

                <div className={s.theme}>
                    <Toggle
                        icons={{
                            checked: <Sun/>,
                            unchecked: <Moon/>,
                        }}
                        onChange={changeTheme}/>
                </div>
                <div className={s.burger}>
                   <div onClick={props.invertShowDropDown} id={"dropDown"}><Burger/></div>
                </div>
            </div>
            <EngWordAutosuggest transWidth={20}/>
        </div>
    )
}