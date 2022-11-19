import React, {FC} from "react";
import s from "../mnemonic/mnemonic.module.scss"
import {SelectedWord} from "../../../shared/models/engWordTypes";

type HighlightLetterType = {
    word: SelectedWord
}

export const HighlightLetter:FC<HighlightLetterType> = (props) => {
    return (
        <>
            {props.word.word.split("").map((el, i) => {
                if (props.word.highlight.includes(i)) {
                    return <span className={s.colorHighlight} key={i}>{el}</span>
                } else {
                    return <span  key={i}>{el}</span>
                }
            })}
        </>
    )
}

