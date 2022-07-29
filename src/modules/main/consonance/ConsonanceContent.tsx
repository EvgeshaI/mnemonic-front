import React, {FC} from "react";
import s from "./consonance.module.css"
import {LengthAndWords} from "../../../shared/models/engWordTypes";


type ConsonanceContentPropsType = {
    consonances: LengthAndWords
}

export const ConsonanceContent:FC<ConsonanceContentPropsType> = (props) => {
    let sortWords = (consonances: Array<string>) => {
        let arr = [...consonances]
        return arr.sort().map((el, i) => <li key={i} className={s.consonance}> {el}</li>)
    }
    let numberOfLetters = (length: number) => {
        return <>Букв: {length}</>
    }
    return (
        <div>
            <div className={s.letterStyle}>{numberOfLetters(props.consonances.length)}</div>
            <ul className={s.consonancesSelect}>
                {sortWords(props.consonances.words)}
            </ul>
        </div>
    )
}