import React from "react";
import preloaderIcon from "../../../import/icons/preloader.gif"
import s from "./preloader.module.css"

export const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img src={preloaderIcon}/>
        </div>
    )
}