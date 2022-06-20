import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from './mnemonic.module.css'
import SeparatedLetter from "./SeparatedLetter";
import {addMnemonicAsync} from "../../../store/engWordSlice";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg"


const CreateMnemonic:FC<{engWordId: number, afterFinishClicked: () => void}> = (props) => {
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
            dispatch(addMnemonicAsync(props.engWordId, mnemo, highlight));
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
            </div >
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