import React, {FC} from "react";
import {IMnemonic} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css"

const ExampleMnemonic: FC<{mnemonic: IMnemonic, selectMnemonic: (id: number) => void}> = (props) => {

    return (
        <li className={s.exampleMnemonic} onClick={()=> props.selectMnemonic(props.mnemonic.mnemonicId)}>
            {props.mnemonic.phrase}
        </li>
    )
};

export default ExampleMnemonic