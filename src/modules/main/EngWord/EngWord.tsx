import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import {getEngWordAsync} from "../../../store/engWordSlice";
import s from './EngWord.module.css'
import {useParams} from "react-router-dom";
import {ITranslation} from "../../../shared/models/engWordTypes";
import MnemonicContainer from "../mnemonic/MnemonicContainer";
import ExampleContainer from "../example/ExampleContainer";
import {AudioComponent} from "./AudioComponent";

const EngWordComponent: FC<any> = () => {
    const dispatch = useAppDispatch();
    const {
        engWord,
        mnemonics,
        examples,
        checkedExample,
        updateExample,
    } = useAppSelector((state) => state.engWordReducer);
    const {
        isAuth
    } = useAppSelector((state) => state.authReducer);


    let params = useParams();
    let urlWord = params.word || "";

    useEffect(() => {
        dispatch(getEngWordAsync(urlWord))
    }, [urlWord]);


    let joinTranslation = (translations: Array<ITranslation>) => {
        return translations.map(t => t.translation).join(", ");
    };

    const defineLocation = (location: string) => {
        if(location === "AMERICAN"){
            return "амер."
        }else {
            return "брит."
        }
    }

    return (
        <>

            <div className={s.engWordContainer}>
                <div className={s.engWordComponent}>
                    <div className={s.engWord}>
                        {engWord && engWord.engWord}
                    </div>
                    <div className={s.transcriptionsBox}>
                        {engWord && engWord.transcriptions.map(el =>
                            <div className={s.transcriptions}>
                                <div className={s.location}> {defineLocation (el.location)}</div>
                                <div className={s.transcriptionWord}>{el.transcription}</div>
                                <AudioComponent audioFile={el.audioFile}/>
                            </div>
                        )}


                    </div>
                    <div className={s.trans}> перевод:</div>
                    <div className={s.translate}>
                        {engWord && <span className={s.translateWord}>{joinTranslation(engWord.translations)}</span>}
                    </div>
                </div>
                <div className={s.word}> мнемоники:</div>
                <div>
                    {engWord &&
                        <MnemonicContainer
                            engWord={engWord}
                            mnemonics={mnemonics}
                            isAuth={isAuth}

                        />
                    }
                </div>
                <br/>

                <div className={s.word}> примеры:</div>
                {examples.length < 1 && mnemonics.length < 1 &&
                    <div className={s.exampleNone}> придумайте мнемонику, чтобы добавить пример
                    </div>
                }
                {engWord &&
                    <ExampleContainer
                        engWord={engWord}
                        mnemonics={mnemonics}
                        examples={examples}
                        updateExample={updateExample}
                        checkedExample={checkedExample}
                        isAuth={isAuth}
                    />
                }
            </div>
        </>
    )
};

export default EngWordComponent