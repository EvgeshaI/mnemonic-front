import React, {FC, useState} from "react";
import {IEngWord, IMnemonic} from "../../../shared/models/engWordTypes";
import MnemonicComponent from "./MnemonicComponent";
import s from './mnemonic.module.scss'
import CreateMnemonic from "./CreateMnemonic";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../../store";
import {getMnemonicAsync} from "../../../store/mnemonicSlice";

type PropsType = {
    engWord: IEngWord
    mnemonics: Array<IMnemonic>
    isAuth: boolean
    hasMoreMnemonics: boolean
}
const MnemonicContainer: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    let [clickCreateMnemonic, setClickCreateMnemonic] = useState(false);
    const navigate = useNavigate()

    let clickOnCreateMnemonic = () => {
        if(props.isAuth) {
            setClickCreateMnemonic(!clickCreateMnemonic)
        }else {
            navigate(`/login`)
        }
    }
    const loadMnemonic = () => {
        dispatch(getMnemonicAsync(props.engWord.id))
    }

    return (
        <>
        <div>
            {props.mnemonics.map(m =>
                <MnemonicComponent
                    key={m.mnemonicId}
                    engWord={props.engWord}
                    auth={props.isAuth}
                    mnemonic={m}
                />
            )}
            {clickCreateMnemonic ?
                <CreateMnemonic engWord={props.engWord} afterFinishClicked={clickOnCreateMnemonic}/>
                :
                <div className={s.addMnemoBox}>
                    <div className={s.addMnemonicButton} onClick={clickOnCreateMnemonic}>
                        +
                    </div>
                    <div className={s.addTooltip}>Добавить мнемонику</div>
                </div>
            }
        </div>
            {props.hasMoreMnemonics &&
                <div className={s.loadMnemonic} onClick={loadMnemonic}> Загрузить ещё</div>
            }
        </>
    )
}

export default MnemonicContainer