import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from './mnemonic.module.scss'
import SeparatedLetter from "./SeparatedLetter";
import {
    calcAccuracyUpdateAsync,
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
        setStatus(statusType.CONSONANCE)
    };
    let addNumber = (i: number) => {
        dispatch(updateHighlightUpdate(i))
    };
    let deleteNumber = (i: number) => {
        dispatch(deleteUpdateHighlight(i))
    };

    return (
        <div className={s.updateMnemonic}>
            <CloseBtn close={closeForm}/>
            {(status === "CONSONANCE" || status === "CHECK")  &&
                <ul className={s.transContainer}>
                    <MyTranslit word={calcAccuracyUpdateMnemo.mnemonicPhrase}
                                highlight={calcAccuracyUpdateMnemo.highlight}
                                accuracy={calcAccuracyUpdateMnemo.accuracy}
                                isCreate={false}
                                trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                    />
                </ul>
            }
            {calcAccuracyUpdateMnemo.accuracy < 25 && (status === "CHECK" || status === "CONSONANCE" ) &&
                <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
            }
            {status === "CHECK" &&
                <div style={{fontSize: 22, margin: 10, cursor: "pointer"}} onClick={() => setStatus(statusType.INIT)}>
                    <HighlightMnemonic highlight={calcAccuracyUpdateMnemo.highlight} mnemonic={calcAccuracyUpdateMnemo.mnemonicPhrase}/>
                </div>
            }
            {(status === "INIT" || status === "CONSONANCE") &&
                <div>
                    <input
                        value={calcAccuracyUpdateMnemo.mnemonicPhrase}
                        onChange={updateMnemoPhrase}
                        className={s.mnemonicInput}
                        placeholder={"добавить мнемонику"}
                        autoFocus={true}
                    />
                </div>
            }
            {status === "INIT" && calcAccuracyUpdateMnemo.mnemonicPhrase.length > 0 &&
                <div>
                    <button className={s.buttonStyle} onClick={calcAccuracy}>
                        Проверить
                    </button>
                </div>
            }
            {status === "CONSONANCE" &&
                <div>
                    {calcAccuracyUpdateMnemo.mnemonicPhrase.split("").map((l, index) => <SeparatedLetter
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l}
                        index={index}
                        key={index}/>)}
                </div>
            }
            {(status === "CHECK" || status === "CONSONANCE") && calcAccuracyUpdateMnemo.accuracy > 25 &&
                <div className={s.buttonStyle} onClick={updateMnemo}>Сохранить</div>
            }
            {status === "CHECK" && calcAccuracyUpdateMnemo.accuracy > 25 &&
                <div className={s.buttonStyleConsonance} onClick={onChooseHighlightFlag}>
                    выбрать созвучие вручную
                </div>
            }
        </div>
    )
};

export default UpdateMnemonic;