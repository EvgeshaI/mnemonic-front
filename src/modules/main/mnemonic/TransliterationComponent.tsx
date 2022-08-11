import React, {FC} from "react";
import s from './mnemonic.module.scss';

type PropsType = {
    transliteration: string,
    accuracy: number
}

export const TransliterationComponent: FC <PropsType> = (props) => {
    return (

        <li className={s.transliteration}>
           <span>{props.transliteration} </span>
           <span>{props.accuracy}%</span>
        </li>
    )
}