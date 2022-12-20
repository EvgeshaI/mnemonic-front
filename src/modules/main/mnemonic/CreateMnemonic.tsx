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
    clearCreateHighlight,
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
        dispatch(clearCreateHighlight())
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
    let input = () => {
        return (
            <input
                value={calcAccuracyCreateMnemo.mnemonicPhrase}
                onChange={updateMnemo}
                className={s.mnemonicInput}
                placeholder={"добавить мнемонику"}
                autoFocus={true}
            />
        )
    }
    let myTranslit = () => {
        return (
            <ul className={s.transContainer}>
                <MyTranslit word={calcAccuracyCreateMnemo.mnemonicPhrase}
                            highlight={calcAccuracyCreateMnemo.highlight}
                            accuracy={calcAccuracyCreateMnemo.accuracy}
                            isCreate={true}
                            trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                />
            </ul>
        )
    }
    let infoText = () => {
        if(calcAccuracyCreateMnemo.accuracy < 25)
            return <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
    }
    let saveButton = () => {
        if(calcAccuracyCreateMnemo.accuracy > 25)
        return <div className={s.buttonStyle} onClick={saveMnemo}>Сохранить</div>
    }
    return (
        <div className={s.createMnemonic}>
            <CloseBtn close={closeForm}/>
            {status === "INIT" &&
                <>
                    {input()}
                    {calcAccuracyCreateMnemo.mnemonicPhrase.length > 0 &&
                        <button className={s.buttonStyle} onClick={calcAccuracy}>
                            Проверить
                        </button>
                    }
                </>
            }
            {status === "CHECK" &&
                <>
                    {myTranslit()}
                    {infoText()}
                    <div style={{fontSize: 22, margin: 10, cursor: "pointer"}} onClick={() => setStatus(statusType.INIT)}>
                        <HighlightMnemonic highlight={calcAccuracyCreateMnemo.highlight} mnemonic={calcAccuracyCreateMnemo.mnemonicPhrase}/>
                    </div>
                    {saveButton()}
                    {calcAccuracyCreateMnemo.accuracy > 25 &&
                        <div className={s.buttonStyleConsonance} onClick={chooseMnemoLetters}>
                            выбрать созвучие вручную
                        </div>
                    }
                </>
            }
            {status === "CONSONANCE" &&
                <>
                    {myTranslit()}
                    {infoText()}
                    {input()}
                    <div>
                        {calcAccuracyCreateMnemo.mnemonicPhrase.split("").map((l, index) => <SeparatedLetter
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

export default CreateMnemonic;