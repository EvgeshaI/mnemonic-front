import React, {FC} from "react";
import {IPart, PartTypes} from "../../../shared/models/engWordTypes";
import s from "./practice.module.scss";

type SentenceFormat0PropsType = {
    parts: Array<IPart>
}

export const SentenceFormat0: FC<SentenceFormat0PropsType> = (props) => {
    let sentenceFn = (part: IPart) => {
        switch (part.type) {
            case PartTypes.PLAIN:
                return <span>{part.part}</span>
            case PartTypes.MNEMONIC:
                return <b className={s.mnemonicPart}>{part.part}</b>
            case PartTypes.TRANSLATION:
                return <span>{part.part}</span>
            default:
                return <></>
        }
    };

    return (
        <>
            {props.parts.map(
                (p, i) =>
                    <span key={i}>{sentenceFn(p)}</span>
            )}
        </>
    )
}