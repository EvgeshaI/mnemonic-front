import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from './mnemonic.module.css'
import SeparatedLetter from "./SeparatedLetter";
import {updateMnemonicAsync} from "../../../store/engWordSlice";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg";

type UpdateMnemonicPropsType = {
    mnemonicId: number,
    mnemonicPhrase: string
    setEdit: (flag: boolean) => void
}


const UpdateMnemonic:FC<UpdateMnemonicPropsType> = (props) => {
    const dispatch = useAppDispatch();
    let [mnemoPhrase, setMnemoPhrase] = useState(props.mnemonicPhrase);
    let [chooseHighlightFlag, setChooseHighlightFlag] = useState(false);
    let [highlight, setHighlight] = useState<Array<number>>([]);

    let updateMnemoPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMnemoPhrase(e.target.value);
    };
    let updateMnemo = () => {
        if(chooseHighlightFlag) {
            dispatch(updateMnemonicAsync(props.mnemonicId, mnemoPhrase, highlight));
            props.setEdit(false);
            setHighlight([]);
        }
    };
    let closeForm = () => {
        props.setEdit(false);
        setHighlight([]);
    }
    let onChooseHighlightFlag = () => {
        setChooseHighlightFlag(true);

    };
    let addNumber = (i:number) => {
            setHighlight([...highlight, i])
    };
    let deleteNumber = (i: number) => {
        setHighlight(highlight.filter(el => el !== i))
    };


    return (
        <div className={s.updateMnemonic}>
            <div className={s.closeButtonBox} onClick={closeForm}>
                <div>
                    <CloseIcon/>
                </div>
            </div >
            <div>
                {!chooseHighlightFlag &&
                    <input  value={mnemoPhrase}
                        onChange={updateMnemoPhrase}
                        className={s.mnemonicInput}
                        placeholder={"добавить мнемонику"}
                        autoFocus={true}
                    />
                }
            </div>

            <div>
                {chooseHighlightFlag &&
                    mnemoPhrase.split("").map((l, index) => <SeparatedLetter
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l} index={index}/>)
                }
            </div>

            {!chooseHighlightFlag && mnemoPhrase.length > 0 &&
            <div>
                <div onClick={onChooseHighlightFlag}
                        className={s.updateButton}>
                    Выбрать созвучие
                </div>
            </div>
            }
            <div>
                {highlight.length > 0 &&
                <div onClick={updateMnemo}
                        className={s.updateButton}>
                    Обновить
                </div>
                }
            </div >
        </div>
    )
};



export default UpdateMnemonic;