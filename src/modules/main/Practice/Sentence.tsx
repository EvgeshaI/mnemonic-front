import React, {FC} from "react";
import {IPracticeExample} from "../../../shared/models/engWordTypes";
import s from './practice.module.scss'

type SentencePropsType = {
    count: number,
    currentExample: IPracticeExample,
    addWordToTranslate: (word: string) => void
}

export const Sentence: FC<SentencePropsType> = (props) => {
    const addWord = (el: string) => {
        props.addWordToTranslate(el.replace(/[^а-яА-ЯЁё]/, ""))
    }
    return (
        <div>
            {props?.currentExample?.sentence.split(" ").map((el, i) =>
                <span key={i} className={s.wordTranslate} onClick={() => addWord(el)}>{el} </span>)}
        </div>
    )
}