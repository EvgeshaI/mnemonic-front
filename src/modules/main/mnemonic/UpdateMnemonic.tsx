import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from './mnemonic.module.scss'
import SeparatedLetter from "./SeparatedLetter";
import {
    calcAccuracyUpdateAsync,
    clearUpdateHighlight,
    deleteUpdateHighlight,
    resetCalcAccuracyUpdateMnemo,
    updateCalcAccuracyUpdateMnemo,
    updateHighlightUpdate,
    updateMnemonicAsync
} from "../../../store/mnemonicSlice";
import MyTranslit from "./MyTranslit";
import {IEngWord, statusType} from "../../../shared/models/engWordTypes";
import {CloseBtn} from "../../util/CloseBtn";
import HighlightMnemonic from "./HighlightMnemonic";

type UpdateMnemonicPropsType = {
    mnemonicId: number,
    mnemonicPhrase: string
    engWord: IEngWord
}

const UpdateMnemonic:FC<UpdateMnemonicPropsType> = (props) => {
    const {
        calcAccuracyUpdateMnemo,
    } = useAppSelector((state) => state.mnemonicReducer);
    const dispatch = useAppDispatch();
    let [status, setStatus] = useState(statusType.INIT);

    let updateMnemoPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCalcAccuracyUpdateMnemo(e.target.value))
    };
    let updateMnemo = () => {
        dispatch(updateMnemonicAsync(props.mnemonicId, calcAccuracyUpdateMnemo.mnemonicPhrase, calcAccuracyUpdateMnemo.highlight, calcAccuracyUpdateMnemo.accuracy));
        dispatch(resetCalcAccuracyUpdateMnemo())
    };
    let closeForm = () => {
        dispatch(resetCalcAccuracyUpdateMnemo())
    }
    let calcAccuracy = () => {
        dispatch(calcAccuracyUpdateAsync(props.engWord.id, calcAccuracyUpdateMnemo.mnemonicId, calcAccuracyUpdateMnemo.mnemonicPhrase))
        setStatus(statusType.CHECK)
    }
    let onChooseHighlightFlag = () => {
        dispatch(clearUpdateHighlight())
        setStatus(statusType.CONSONANCE)
    };
    let addNumber = (i: number) => {
        dispatch(updateHighlightUpdate(i))
    };
    let deleteNumber = (i: number) => {
        dispatch(deleteUpdateHighlight(i))
    };
    let input = () => {
        return (
            <div>
                <input
                    value={calcAccuracyUpdateMnemo.mnemonicPhrase}
                    onChange={updateMnemoPhrase}
                    className={s.mnemonicInput}
                    placeholder={"добавить мнемонику"}
                    autoFocus={true}
                />
            </div>
        )
    }
    let myTranslit = () => {
        return (
            <ul className={s.transContainer}>
                <MyTranslit word={calcAccuracyUpdateMnemo.mnemonicPhrase}
                            highlight={calcAccuracyUpdateMnemo.highlight}
                            accuracy={calcAccuracyUpdateMnemo.accuracy}
                            isCreate={false}
                            trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                />
            </ul>
        )
    }
    let infoText = () => {
        if(calcAccuracyUpdateMnemo.accuracy < 25)
        return (
            <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
        )
    }
    let saveButton = () => {
        if(calcAccuracyUpdateMnemo.accuracy > 25){
            return (
                <div className={s.buttonStyle} onClick={updateMnemo}>Сохранить</div>
            )
        }
    }
    return (
        <div className={s.updateMnemonic}>
            <CloseBtn close={closeForm}/>
            {status === "INIT" &&
                <>
                    {input()}
                    {calcAccuracyUpdateMnemo.mnemonicPhrase.length > 0 &&
                        <div>
                            <button className={s.buttonStyle} onClick={calcAccuracy}>
                                Проверить
                            </button>
                        </div>
                    }
                </>
            }
            {status === "CHECK" &&
                <>
                    {myTranslit()}
                    {infoText()}
                    <div style={{fontSize: 22, margin: 10, cursor: "pointer"}} onClick={() => setStatus(statusType.INIT)}>
                        <HighlightMnemonic highlight={calcAccuracyUpdateMnemo.highlight} mnemonic={calcAccuracyUpdateMnemo.mnemonicPhrase}/>
                    </div>
                    {calcAccuracyUpdateMnemo.accuracy > 25 &&
                        <>
                            {saveButton()}
                            <div className={s.buttonStyleConsonance} onClick={onChooseHighlightFlag}>
                                выбрать созвучие вручную
                            </div>
                        </>
                    }
                </>
            }
            {status === "CONSONANCE" &&
                <>
                    {myTranslit()}
                    {infoText()}
                    {input()}
                    <div>
                        {calcAccuracyUpdateMnemo.mnemonicPhrase.split("").map((l, index) => <SeparatedLetter
                            deleteNumber ={deleteNumber}
                            addNumber ={addNumber}
                            letter={l}
                            index={index}
                            key={index}/>)}
                    </div>
                    {saveButton()}
                </>
            }
        </div>
    )
};

export default UpdateMnemonic;