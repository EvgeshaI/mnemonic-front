import React, {FC} from "react";
import s from "./consonance.module.scss"
import {LengthAndWords} from "../../../shared/models/engWordTypes";
import useWindowDimensions from "../../util/windowDimensions";

type ConsonanceContentPropsType = {
    consonances: LengthAndWords,
    locationContent: string | null,
    addSelectedWord: (word: string) => void
}

export const ConsonanceContent:FC<ConsonanceContentPropsType> = (props) => {
    const { width } = useWindowDimensions();
    const isMobileScreen = width < 600
    let widthConsonance = isMobileScreen ? 80 : 25;
    const pushConsonanceWords = (word: string) => {
        props.addSelectedWord(word)
    }
    let sortWords = (consonances: Array<string>) => {
        let arr = [...consonances]
        return arr.sort().map((el, i) =>
            <li key={i}
                className={s.consonance}
                style={{width: `${widthConsonance}%`}}
                onClick={() => pushConsonanceWords(el)}
            >
                {el}
            </li>)
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