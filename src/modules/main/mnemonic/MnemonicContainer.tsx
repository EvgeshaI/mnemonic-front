import React, {FC, useState} from "react";
import {IMnemonic} from "../../../shared/models/engWordTypes";
import MnemonicComponent from "./MnemonicComponent";
import s from './mnemonic.module.css'
import CreateMnemonic from "./CreateMnemonic";

type PropsType = {
    engWordId: number
    mnemonics: Array<IMnemonic>
}
const MnemonicContainer: FC<PropsType> = (props) => {

    let [clickCreateMnemonic, setClickCreateMnemonic] = useState(false);

    let clickOnCreateMnemonic = () => {
        setClickCreateMnemonic(!clickCreateMnemonic)
    }
    return (
        <div className={s.mnemonicContainer}>
            {props.mnemonics.map(m => <MnemonicComponent mnemonic={m}/>)}
            {clickCreateMnemonic ?
                <CreateMnemonic engWordId={props.engWordId} afterFinishClicked={clickOnCreateMnemonic}/>
                :
                <div className={s.addMnemonicButton} onClick={clickOnCreateMnemonic}>
                    Добавить мнемонику
                </div>
            }
        </div>
    )
}

export default MnemonicContainer