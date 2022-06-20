import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {getEngWordAsync} from "../../store/engWordSlice";
import s from './EngWord.module.css'
import {useParams} from "react-router-dom";
import {ITranslation} from "../../shared/models/engWordTypes";
import MnemonicContainer from "./mnemonic/MnemonicContainer";
import ExampleContainer from "./example/ExampleContainer";

const EngWordComponent:FC<any> = () => {
    const dispatch = useAppDispatch();
    const {
        engWord,
        mnemonics,
        examples,
        checkedExample,
        updateExample
    } = useAppSelector((state) => state.engWordReducer);

    let params = useParams();
    let urlWord = params.word || "";

    useEffect( () => {
        dispatch(getEngWordAsync(urlWord))
    }, [urlWord]);
    let [text, setText] = useState("");

    let updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)

    };
    let addTranslation = () => {
        if (engWord) {
            setText("")
        }
    };

    let joinTranslation = (translations: Array<ITranslation>) => {
        let joined = translations.map(t => t.translation).join(", ");
        return joined
    };

    return (
        <>

        <div className={s.engWordContainer}>
            <div className={s.engWordComponent}>
                <div className={s.engWord}>
                    {engWord && engWord.engWord}
                </div>
                <div className={s.trans}> перевод: </div>
                <div className={s.translate}>
                    {engWord && <span className={s.translateWord}>{joinTranslation(engWord.translations)}</span>}
                </div>
            </div>
            <div className={s.word}> мнемоники: </div>
            <div>
                {engWord &&
                    <MnemonicContainer
                        engWordId={engWord.id}
                        mnemonics={mnemonics}
                    />
                }
            </div>
            <br/>
            <div className={s.word}> примеры: </div>
            {engWord &&
                <ExampleContainer
                    engWord={engWord}
                    mnemonics={mnemonics}
                    examples={examples}
                    updateExample={updateExample}
                    checkedExample={checkedExample}
                />
            }
        </div>
        </>
    )
};

export default EngWordComponent