import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from './mnemonic.module.scss'
import SeparatedLetter from "./SeparatedLetter";
import {IEngWord, statusType} from "../../../shared/models/engWordTypes";
import MyTranslit from "./MyTranslit";
import {
    addMnemonicAsync,
    calcAccuracyCreateAsync,
    clearCalcAccuracyMnemo,
    clearClearCreateHighlight,
    deleteCreateHighlight,
    updateCalcAccuracyCreateMnemo,
    updateCreateHighlight
} from "../../../store/mnemonicSlice";
import {CloseBtn} from "../../util/CloseBtn";
import HighlightMnemonic from "./HighlightMnemonic";

type CreateMnemonicPropsType = {
    engWord: IEngWord;
    afterFinishClicked: () => void;
}


const CreateMnemonic:FC<CreateMnemonicPropsType> = (props) => {
    const {
        calcAccuracyCreateMnemo
    } = useAppSelector((state) => state.mnemonicReducer);
    useEffect(() => {
        dispatch(calcAccuracyCreateAsync(props.engWord.id, ""))
        return () => {
            dispatch(clearCalcAccuracyMnemo())
        }
    },[])
    const dispatch = useAppDispatch();
    let [status, setStatus] = useState(statusType.INIT);

    let updateMnemo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCalcAccuracyCreateMnemo(e.target.value))
    };
    let saveMnemo = () => {
        dispatch(addMnemonicAsync(props.engWord.id, calcAccuracyCreateMnemo!.mnemonicPhrase, calcAccuracyCreateMnemo!.highlight, calcAccuracyCreateMnemo!.accuracy))
        props.afterFinishClicked()
    }
    let closeForm = () => {
        props.afterFinishClicked();
    }
    let chooseMnemoLetters = () => {
        dispatch(clearClearCreateHighlight())
        // setMnemo(calcAccuracyMnemo!.mnemonicPhrase.replace(/\s+/g, ' '))
        setStatus(statusType.CONSONANCE)
    };
    let calcAccuracy = () => {
        dispatch(calcAccuracyCreateAsync(props.engWord.id, calcAccuracyCreateMnemo!.mnemonicPhrase))
        setStatus(statusType.CHECK)
    }
    let addNumber = (i:number) => {
        dispatch(updateCreateHighlight(i))
    };
    let deleteNumber = (i: number) => {
        dispatch(deleteCreateHighlight(i))
    };
    return (

        <div className={s.createMnemonic}>
            <CloseBtn close={closeForm}/>
            {(status === "CONSONANCE" || status === "CHECK")  &&
                <ul className={s.transContainer}>
                    <MyTranslit word={calcAccuracyCreateMnemo.mnemonicPhrase}
                                highlight={calcAccuracyCreateMnemo.highlight}
                                accuracy={calcAccuracyCreateMnemo.accuracy}
                                isCreate={true}
                                trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                    />
                </ul>
            }
            {calcAccuracyCreateMnemo.accuracy < 25 && (status === "CHECK" || status === "CONSONANCE" ) &&
                <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
            }
            {status === "CHECK" &&
                <div style={{fontSize: 22, margin: 10, cursor: "pointer"}} onClick={() => setStatus(statusType.INIT)}>
                    <HighlightMnemonic highlight={calcAccuracyCreateMnemo.highlight} mnemonic={calcAccuracyCreateMnemo.mnemonicPhrase}/>
                </div>
            }
            {(status === "INIT" || status === "CONSONANCE") &&
                <div>
                    <input
                    value={calcAccuracyCreateMnemo.mnemonicPhrase}
                    onChange={updateMnemo}
                    className={s.mnemonicInput}
                    placeholder={"добавить мнемонику"}
                    autoFocus={true}
                    />
                </div>
            }
            {status === "INIT" && calcAccuracyCreateMnemo.mnemonicPhrase.length > 0 &&
                <div>
                    <button className={s.buttonStyle} onClick={calcAccuracy}>
                        Проверить
                    </button>
                </div>
            }
            {status === "CONSONANCE" &&
                <div>
                    {calcAccuracyCreateMnemo.mnemonicPhrase.split("").map((l, index) => <SeparatedLetter
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l}
                        index={index}
                        key={index}/>)}
                </div>
            }
            {(status === "CHECK" || status === "CONSONANCE") && calcAccuracyCreateMnemo.accuracy > 25 &&
                <div className={s.buttonStyle} onClick={saveMnemo}>Сохранить</div>
            }
            {status === "CHECK" && calcAccuracyCreateMnemo.accuracy > 25 &&
                <div className={s.buttonStyleConsonance} onClick={chooseMnemoLetters}>
                    выбрать созвучие вручную
                </div>
            }
        </div>
    )
};

export default CreateMnemonic;