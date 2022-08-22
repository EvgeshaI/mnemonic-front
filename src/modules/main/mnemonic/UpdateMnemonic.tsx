import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from './mnemonic.module.scss'
import SeparatedLetter from "./SeparatedLetter";
import {updateMnemonicAsync} from "../../../store/mnemonicSlice";
import MyTranslit from "./MyTranslit";
import {IEngWord} from "../../../shared/models/engWordTypes";
import {CloseBtn} from "../../util/CloseBtn";

type UpdateMnemonicPropsType = {
    mnemonicId: number,
    mnemonicPhrase: string
    setEdit: (flag: boolean) => void
    engWord: IEngWord
}

const UpdateMnemonic:FC<UpdateMnemonicPropsType> = (props) => {
    const dispatch = useAppDispatch();
    let [mnemoPhrase, setMnemoPhrase] = useState(props.mnemonicPhrase);
    let [chooseHighlightFlag, setChooseHighlightFlag] = useState(false);
    let [highlight, setHighlight] = useState<Array<number>>([]);
    let [displaySaveBtn, setDisplaySaveBtn] = useState(false)

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
    let canSaveMnemonic = (accuracy: number) => {
        if(accuracy >= 25){
            setDisplaySaveBtn(true)
        } else {
            setDisplaySaveBtn(false)
        }
    }

    return (
        <div className={s.updateMnemonic}>
            <CloseBtn close={closeForm} />
            <div>
                <ul className={s.transContainer}>
                    <MyTranslit
                        word={props.mnemonicPhrase}
                        highlight={highlight}
                        trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                        canSaveMnemonic={canSaveMnemonic}
                    />
                </ul>
                {!displaySaveBtn &&
                    <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
                }
            </div>

            <div>
                {!chooseHighlightFlag &&
                    <input value={mnemoPhrase}
                        onChange={updateMnemoPhrase}
                        className={s.mnemonicInput}
                        placeholder={"обновить мнемонику"}
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
                <div onClick={onChooseHighlightFlag} className={s.buttonStyle}>
                    Выбрать созвучие
                </div>
            </div>
            }
            {highlight.length > 0 &&
                <div onClick={updateMnemo} className={s.buttonStyle}>
                    Обновить
                </div>
            }
        </div>
    )
};

export default UpdateMnemonic;