import React from "react";
import {ReactComponent as PreloaderIcon} from "../../../import/icons/rings.svg"
import s from "./preloader.module.css"

export const Preloader = () => {
    return (
        <div className={s.preloader}>
           <PreloaderIcon/>
        </div>
    )
}