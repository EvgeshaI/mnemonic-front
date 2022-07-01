import React, {FC} from "react";
import {IPart, PartTypes} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";

type ExampleFormatPropsType = {
    part: IPart
}
export const ExampleFormat:FC<ExampleFormatPropsType> = (props) => {
    let exampleFn = (part: IPart) => {
        if (part.type === PartTypes.PLAIN) {
            return <span>{part.part}</span>
        } else if (part.type === PartTypes.TRANSLATION) {
            return <span className={s.translationPart}>{part.part}</span>
        } else if (part.type === PartTypes.MNEMONIC) {
            return <span className={s.mnemonicPart}>{part.part}</span>
        }
        return <></>
    };

    return (
        exampleFn(props.part)
    )
}