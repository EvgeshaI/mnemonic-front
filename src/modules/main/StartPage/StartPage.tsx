import React, {FC} from 'react'
import s from './startPage.module.css'
import {useNavigate} from "react-router";
import {ReactComponent as Logo} from "../../../import/icons/logo.svg"

export const StartPage: FC = () => {
    let navigate = useNavigate()
    return (
        <>
            <div className={s.h}> <Logo/> </div>
        </>
    )
};