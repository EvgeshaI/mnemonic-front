import React, {FC} from "react";
import s from "./Example.module.css"
import {ITranslation} from "../../../shared/models/engWordTypes";

const ExampleTranslation: FC<{translation: ITranslation, selectTranslation (id: number): void}> = (props) => {

    return (
        <li className={s.wordTranslation} onClick={() => props.selectTranslation(props.translation.id)}>
            {props.translation.translation}
        </li>
    )
};

export default ExampleTranslation