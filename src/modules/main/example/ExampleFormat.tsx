import React, {FC} from "react";
import {IPart, PartTypes} from "../../../shared/models/engWordTypes";
import s from "./Example.module.scss";

type ExampleFormatPropsType = {
    parts: Array<IPart>
}
export const ExampleFormat:FC<ExampleFormatPropsType> = (props) => {
    let exampleFn = (part: IPart) => {
        switch (part.type) {
            case PartTypes.PLAIN:
                return <span>{part.part}</span>
            case PartTypes.MNEMONIC:
                return <span className={s.mnemonicPart}>{part.part}</span>
            case PartTypes.TRANSLATION:
                return <span className={s.translationPart}>{part.part}</span>
            default:
                return <></>
        }
    };

    return (
        <>
            {props.parts.map(
                (p, i) =>
                    <span key={i}>{exampleFn(p)}</span>
            )}
        </>
    )
}