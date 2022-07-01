import React from "react";
import preloader from "../../../import/icons/preloader.gif"
import s from "./preloader.module.css"

export const Preloader = () => {
    return (
        <div className={s.preloader}>
            {preloader}
        </div>
    )
}