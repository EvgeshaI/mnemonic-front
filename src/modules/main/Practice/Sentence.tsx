import React, {FC} from "react";
import {IPracticeExample} from "../../../shared/models/engWordTypes";
import s from './practice.module.scss'

type SentencePropsType = {
    count: number,
    currentExample: IPracticeExample,
    addWordToTranslate: (word: string) => void
}

export const Sentence: FC<SentencePropsType> = (props) => {
    return (
        <div>
            {props?.currentExample?.sentence.split(" ").map(el =>
                <span className={s.wordTranslate} onClick={() => props.addWordToTranslate(el)}>{el} </span>)}
        </div>
    )
}