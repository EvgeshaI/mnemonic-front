import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from './mnemonic.module.scss'
import SeparatedLetter from "./SeparatedLetter";
import {IEngWord} from "../../../shared/models/engWordTypes";
import MyTranslit from "./MyTranslit";
import {addMnemonicAsync, calcAccuracyAsync} from "../../../store/mnemonicSlice";
import {CloseBtn} from "../../util/CloseBtn";
import HighlightMnemonic from "./HighlightMnemonic";

type CreateMnemonicPropsType = {
    engWord: IEngWord;
    afterFinishClicked: () => void;
}

const CreateMnemonic:FC<CreateMnemonicPropsType> = (props) => {
    const {
        calcAccuracyMnemo
    } = useAppSelector((state) => state.mnemonicReducer);
    const dispatch = useAppDispatch();
    let [mnemo, setMnemo] = useState("");
    let [check, setCheck] = useState(false);
    let [chooseConsonance, setChooseConsonance] = useState(false);
    let [highlight, setHighlight] = useState<Array<number>>([]);
    let [displaySaveBtn, setDisplaySaveBtn] = useState(false)

    let updateMnemo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMnemo(e.target.value);
        // setEntered(false)
        setHighlight([])
    };
    // let saveMnemo = () => {
    //     if(entered) {
    //         dispatch(addMnemonicAsync(props.engWord.id, mnemo, highlight));
    //         setMnemo("");
    //         setHighlight([]);
    //         props.afterFinishClicked();
    //     }
    // };
    let saveMnemo = () => {
        dispatch(addMnemonicAsync(props.engWord.id, calcAccuracyMnemo!.mnemonicPhrase, calcAccuracyMnemo!.highlight, calcAccuracyMnemo!.accuracy))
        props.afterFinishClicked();
        setMnemo("");
        setHighlight([]);
        props.afterFinishClicked()
    }
    let closeForm = () => {
        setMnemo("");
        setHighlight([]);
        props.afterFinishClicked();
    }

    let chooseMnemoLetters = () => {
        setMnemo(mnemo.replace(/\s+/g, ' '))
        setChooseConsonance(true)
    };
    let calcAccuracy = () => {
        dispatch(calcAccuracyAsync(props.engWord.id, mnemo))
        setCheck(true);
    }
    let addNumber = (i:number) => {
        setHighlight([...highlight, i])
    };
    let deleteNumber = (i: number) => {
        setHighlight(highlight.filter(el => el !== i))
    };
    let canSaveMnemonic = (accuracy: number) => {
        if(accuracy >= 25){
            setDisplaySaveBtn(true)
        } else {
            setDisplaySaveBtn(false)
        }
    }

    return (
        <div className={s.createMnemonic}>
            <CloseBtn close={closeForm}/>
            {check && calcAccuracyMnemo && !chooseConsonance ?
                <div className={s.myTransliteration}>
                    {Math.round(calcAccuracyMnemo.accuracy)}%
                    {!displaySaveBtn &&
                        <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
                    }
                </div>
                :
                <ul className={s.transContainer}>
                <MyTranslit word={mnemo}
                            highlight={highlight}
                            canSaveMnemonic = {canSaveMnemonic}
                            trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                />
            </ul>
            }
            {check && calcAccuracyMnemo && !chooseConsonance &&
                <div style={{fontSize: 22, margin: 10}}>
                    <HighlightMnemonic highlight={calcAccuracyMnemo.highlight} mnemonic={calcAccuracyMnemo.mnemonicPhrase}/>
                </div>
            }
            {(!check || chooseConsonance) &&
                <div>
                    <input
                    value={mnemo}
                    onChange={updateMnemo}
                    className={s.mnemonicInput}
                    placeholder={"добавить мнемонику"}
                    autoFocus={true}
                    />
                </div>
            }
            {check && calcAccuracyMnemo && !chooseConsonance &&
            <div>
                <div className={s.buttonStyle} onClick={saveMnemo}>Сохранить</div>
                <div className={s.buttonStyleConsonance} onClick={chooseMnemoLetters}>
                    выбрать созвучие вручную
                </div>
            </div>
            }
            {chooseConsonance && calcAccuracyMnemo &&
                <div>
                    {mnemo.split("").map((l, index) => <SeparatedLetter
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l}
                        index={index}
                        key={index}/>)}
                </div>
            }
            {!check && mnemo.length > 0 &&
            <div>
                <button className={s.buttonStyle} onClick={calcAccuracy}>
                    Проверить
                </button>
            </div>
            }
            <div>
                {chooseConsonance &&
                <button onClick={saveMnemo}
                        className={s.buttonStyle}
                        disabled={!mnemo}>
                    Сохранить
                </button>
                }
            </div>
        </div>
    )
};

export default CreateMnemonic;