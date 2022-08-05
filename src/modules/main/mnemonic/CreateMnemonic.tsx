import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from './mnemonic.module.css'
import SeparatedLetter from "./SeparatedLetter";
import {IEngWord} from "../../../shared/models/engWordTypes";
import {TransliterationComponent} from "./TransliterationComponent";
import MyTranslit from "./MyTranslit";
import {addMnemonicAsync} from "../../../store/mnemonicSlice";
import {CloseBtn} from "../../util/CloseBtn";

type CreateMnemonicPropsType = {
    engWord: IEngWord;
    afterFinishClicked: () => void;
}

const CreateMnemonic:FC<CreateMnemonicPropsType> = (props) => {
    const dispatch = useAppDispatch();
    let [mnemo, setMnemo] = useState("");
    let [entered, setEntered] = useState(false);
    let [highlight, setHighlight] = useState<Array<number>>([]);
    let [displaySaveBtn, setDisplaySaveBtn] = useState(false)

    let updateMnemo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMnemo(e.target.value);
        setEntered(false)
        setHighlight([])
    };
    let saveMnemo = () => {
        if(entered) {
            dispatch(addMnemonicAsync(props.engWord.id, mnemo, highlight));
            setMnemo("");
            setHighlight([]);
            props.afterFinishClicked();
        }
    };
    let closeForm = () => {
        setMnemo("");
        setHighlight([]);
        props.afterFinishClicked();
    }

    let chooseMnemoLetters = () => {
        setMnemo(mnemo.replace(/\s+/g, ' '))
        setEntered(true);
    };
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
            {entered &&
                <div>
                    <ul className={s.transContainer}>
                        {props.engWord.transliterations.map((tr,i) =>
                            <TransliterationComponent key={i} transliteration={tr.transliteration} accuracy={tr.accuracy}/>
                        )}
                        <MyTranslit word={mnemo}
                                    highlight={highlight}
                                    canSaveMnemonic = {canSaveMnemonic}
                                    trans={props.engWord.transliterations}
                        />
                    </ul>
                    {!displaySaveBtn &&
                        <div className={s.accuracyMessage}>точность мнемоники должна быть более 24%</div>
                    }
                </div>
            }
            <div>
                <input
                    value={mnemo}
                    onChange={updateMnemo}
                    className={s.mnemonicInput}
                    placeholder={"добавить мнемонику"}
                    autoFocus={true}
                />
            </div>

            {entered &&
                <div>
                    {mnemo.split("").map((l, index) => <SeparatedLetter
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l}
                        index={index}
                        key={index}/>)}
                </div>
            }

            {!entered && mnemo.length > 0 &&
            <div>
                <button onClick={chooseMnemoLetters}
                        className={s.buttonStyle}
                        disabled={!mnemo}>
                    Выбрать созвучие
                </button>
            </div>
            }
            <div>
                {displaySaveBtn &&
                <button onClick={saveMnemo}
                        className={s.buttonStyle}
                        disabled={!mnemo}>
                    Сохранить
                </button>
                }
            </div >
        </div>
    )
};

export default CreateMnemonic;