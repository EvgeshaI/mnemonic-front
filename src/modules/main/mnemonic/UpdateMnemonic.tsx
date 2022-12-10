import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from './mnemonic.module.scss'
import SeparatedLetter from "./SeparatedLetter";
import {calcAccuracyAsync, updateMnemonicAsync} from "../../../store/mnemonicSlice";
import MyTranslit from "./MyTranslit";
import {IEngWord} from "../../../shared/models/engWordTypes";
import {CloseBtn} from "../../util/CloseBtn";
import HighlightMnemonic from "./HighlightMnemonic";

type UpdateMnemonicPropsType = {
    mnemonicId: number,
    mnemonicPhrase: string
    setEdit: (flag: boolean) => void
    engWord: IEngWord
}

const UpdateMnemonic:FC<UpdateMnemonicPropsType> = (props) => {
    const {
        calcAccuracyMnemo
    } = useAppSelector((state) => state.mnemonicReducer);
    const dispatch = useAppDispatch();
    let [mnemoPhrase, setMnemoPhrase] = useState(props.mnemonicPhrase);
    let [checkNewMnemo, setCheckNewMnemo] = useState(false);
    let [chooseHighlightFlag, setChooseHighlightFlag] = useState(false);
    let [highlight, setHighlight] = useState<Array<number>>([]);
    let [displaySaveBtn, setDisplaySaveBtn] = useState(false)

    let updateMnemoPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMnemoPhrase(e.target.value);
    };
    let updateMnemo = () => {
        if(calcAccuracyMnemo) {
            dispatch(updateMnemonicAsync(props.mnemonicId, calcAccuracyMnemo.mnemonicPhrase, calcAccuracyMnemo.highlight, calcAccuracyMnemo.accuracy));
            props.setEdit(false);
            setHighlight([]);
        }
    };
    let closeForm = () => {
        props.setEdit(false);
        setHighlight([]);
    }
    let calcAccuracy = () => {
        dispatch(calcAccuracyAsync(props.engWord.id, mnemoPhrase))
        setCheckNewMnemo(true)
    }
    let onChooseHighlightFlag = () => {
        setChooseHighlightFlag(true);
    };
    let addNumber = (i: number) => {
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
                {chooseHighlightFlag ?
                    <ul className={s.transContainer}>
                        <MyTranslit
                            word={mnemoPhrase}
                            highlight={highlight}
                            trans={props.engWord.transcriptions.flatMap(t => t.transliterations)}
                            canSaveMnemonic={canSaveMnemonic}
                        />
                    </ul> :
                    <div className={s.myTransliteration}>{Math.round(calcAccuracyMnemo!.accuracy)}%</div>
                }
                {!displaySaveBtn &&
                    <div className={s.accuracyMessage}>точность мнемоники должна быть не менее 25%</div>
                }
            </div>
            <div>
                {(chooseHighlightFlag || !checkNewMnemo) &&
                    <input value={mnemoPhrase}
                        onChange={updateMnemoPhrase}
                        className={s.mnemonicInput}
                        placeholder={"обновить мнемонику"}
                        autoFocus={true}
                    />
                }
            </div>
            <div style={{fontSize: 22, margin: 10}}>
                {checkNewMnemo && calcAccuracyMnemo && !chooseHighlightFlag &&
                    <HighlightMnemonic highlight={calcAccuracyMnemo.highlight} mnemonic={calcAccuracyMnemo.mnemonicPhrase}/>
                }
            </div>
            <div>
                {chooseHighlightFlag &&
                    mnemoPhrase.split("").map((l, index) => <SeparatedLetter
                        key={index}
                        deleteNumber ={deleteNumber}
                        addNumber ={addNumber}
                        letter={l} index={index}/>)
                }
            </div>
            {!chooseHighlightFlag && mnemoPhrase.length > 0 && !checkNewMnemo &&
            <div>
                <div className={s.buttonStyle} onClick={calcAccuracy}>
                    Проверить
                </div>
            </div>
            }
            {checkNewMnemo && !chooseHighlightFlag &&
                <div>
                    <div onClick={updateMnemo} className={s.buttonStyle}>
                        Обновить
                    </div>
                    <div className={s.buttonStyleConsonance} onClick={onChooseHighlightFlag}>
                        выбрать созвучие
                    </div>
                </div>
            }
            {chooseHighlightFlag && highlight.length >0 &&
            <div onClick={updateMnemo} className={s.buttonStyle}>Обновить</div>
            }
        </div>
    )
};

export default UpdateMnemonic;