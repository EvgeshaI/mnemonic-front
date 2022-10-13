import React, {FC} from "react";
import s from "./EngWord.module.scss";
import {ITransliteration} from "../../../shared/models/engWordTypes";

type TransliterationsPropsType = {
    transliterations: Array<ITransliteration>
}

export const Transliterations: FC<TransliterationsPropsType> = (props) => {
   let sortTranslit = [...props.transliterations].sort((a, b) => b.accuracy - a.accuracy)
    return (
        <>
            {
                sortTranslit.length > 0 &&
                <div className={s.transliter}>
                    <div className={s.transl}>
                        [{sortTranslit[0].transliteration}]
                    </div>
                </div>
            }
        </>
    )
}