import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from './mnemonic.module.css'
import SeparatedLetter from "./SeparatedLetter";
import {addMnemonicAsync} from "../../../store/engWordSlice";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg"
import {IEngWord} from "../../../shared/models/engWordTypes";
import {TransliterationComponent} from "./TransliterationComponent";
import MyTranslit from "./MyTranslit";


const CreateMnemonic:FC<{engWord: IEngWord, afterFinishClicked: () => void}> = (props) => {
    const dispatch = useAppDispatch();
    let [mnemo, setMnemo] = useState("");
    let [entered, setEntered] = useState(false);
    let [highlight, setHighlight] = useState<Array<number>>([]);

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


    return (
        <div className={s.createMnemonic}>
            <div className={s.closeButtonBox} onClick={closeForm}>
                <div>
                    <CloseIcon/>
                </div>
            </div>
            {entered &&
                <div>
                <ul className={s.transContainer}>
                    {props.engWord.transliterations.map((tr) =>
                    <TransliterationComponent transliteration={tr.transliteration} accuracy={tr.accuracy}/> )}
                    {<MyTranslit word={mnemo} highlight={highlight} trans={props.engWord.transliterations}/>}
                </ul>

                </div>
            }
            <div>
                <input  value={mnemo}
                    onChange={updateMnemo}
                    className={s.mnemonicInput}
                    placeholder={"добавить мнемонику"}
                    autoFocus={true}
                />
            </div>

            <div>

                {entered &&
                    mnemo.split("").map((l, index) => <SeparatedLetter
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l} index={index}/>)
                }
            </div>

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

                {highlight.length > 0 &&
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