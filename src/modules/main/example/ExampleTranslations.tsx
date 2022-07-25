import React, {FC} from "react";
import s from "./Example.module.css"
import {ITranslation} from "../../../shared/models/engWordTypes";

const ExampleTranslations: FC<{translations: Array<ITranslation>, selectTranslation (id: number): void}> = (props) => {

    return (
        <div>
            <ul className={s.translationSelect}>
                {props.translations
                    .map(t =>
                        <li key={t.id} className={s.wordTranslation} onClick={() => props.selectTranslation(t.id)}>
                            {t.translation}
                        </li>
                    )}
            </ul>
        </div>
    )
};

export default ExampleTranslations