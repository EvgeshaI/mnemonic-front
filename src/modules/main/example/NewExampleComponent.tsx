import React, {FC} from "react";
import {IExample, IPart, PartTypes} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";


type PropsType = {
    example: IExample | null
}
const NewExampleComponent: FC<PropsType> = (props) => {

    let exampleFn = (part: IPart) => {
        if (part.type === PartTypes.PLAIN) {
            return <span>{part.part}</span>
        } else if (part.type === PartTypes.TRANSLATION) {
            return <span className={s.translationPart}>{part.part}</span>
        } else if (part.type === PartTypes.MNEMONIC) {
            return <span className={s.mnemonicPart}>{part.part}</span>
        }
    };

    return (
        <div className={s.exampleContainer}>
            <div className={s.newExampleSentence}>
                {props.example!.parts.map(p => exampleFn(p))}
            </div>

        </div>
    )
};

export default NewExampleComponent