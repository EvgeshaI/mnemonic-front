import React, {FC} from "react";
import {IMnemonic} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css"

const ExampleMnemonics: FC<{mnemonics: Array<IMnemonic>, selectMnemonic: (id: number) => void}> = (props) => {

    return (
        <ul className={s.mnemonicSelect}>
            {props.mnemonics.map(m =>
                <li className={s.exampleMnemonic} onClick={()=> props.selectMnemonic(m.mnemonicId)}>
                    {m.phrase}
                </li>
            )}
        </ul>
    )
};

export default ExampleMnemonics