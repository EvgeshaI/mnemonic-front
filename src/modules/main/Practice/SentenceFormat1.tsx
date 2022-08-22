import React, {FC} from "react";
import s from "./practice.module.scss"
import {IPart} from "../../../shared/models/engWordTypes";

type SentenceFormat1PropsType = {
    sentence: string
    mnemonicInSentence:string
    parts: Array<IPart>
}

export const SentenceFormat1: FC<SentenceFormat1PropsType> = (props) => {
    const sentenceFn = (sentence: string) => {
       return  sentence.split(" ")
    }
    const mnemonicInSentenceArr = props.mnemonicInSentence.split(" ")
    const partOfMnemonic = (word: string) => {
        word = word.replaceAll(/[^а-яА-ЯёЁ]/g, '')
        return mnemonicInSentenceArr.includes(word)
    }
    const getHighlightMnemonic = (word: string) => {
        return word.split("").map((sym, i) => {
            if (/[а-яА-ЯёЁ]/.test(sym)) {
                return <b className={s.underlineMnemo} key={i}>{sym}</b>
            } else {
                return <span key={i}>{sym}</span>
            }
        })
    }
    return (
        <>
            {sentenceFn(props.sentence).map((el, i) => {
                if(partOfMnemonic(el)){
                    return <span key={i}> {getHighlightMnemonic(el)}</span>
                }
                return <span key={i}> {el}</span>
            })}
        </>
    )
}