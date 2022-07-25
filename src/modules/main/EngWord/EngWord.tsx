import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import {getEngWordAsync} from "../../../store/engWordSlice";
import s from './EngWord.module.css'
import {useParams} from "react-router-dom";
import {ITranscription, ITranslation} from "../../../shared/models/engWordTypes";
import MnemonicContainer from "../mnemonic/MnemonicContainer";
import ExampleContainer from "../example/ExampleContainer";
import {AudioComponent} from "./AudioComponent";
import {resetMnemonic} from "../../../store/mnemonicSlice";
import {resetExample} from "../../../store/exampleSlice";

const EngWord: FC<any> = () => {
    const dispatch = useAppDispatch();
    const {
        engWord,
    } = useAppSelector((state) => state.engWordReducer);
    const {
        mnemonics,
    } = useAppSelector((state) => state.mnemonicReducer);
    const hasMoreMnemonics = useAppSelector((state) => state.mnemonicReducer).hasMore
    const {
        examples,
        checkedExample,
        updateExample,
        updateExamples
    } = useAppSelector((state) => state.exampleReducer);
    const hasMoreExample = useAppSelector((state) => state.exampleReducer).hasMore;
    const {
        isAuth
    } = useAppSelector((state) => state.authReducer);


    let params = useParams();
    let urlWord = params.word || "";

    useEffect(() => {
        dispatch(getEngWordAsync(urlWord))
        return () => {
            dispatch(resetMnemonic())
            dispatch(resetExample())
        }
    }, [urlWord]);


    let joinTranslation = (translations: Array<ITranslation>) => {
        return translations.filter((el, i) => i < 4).map(t => t.translation).join(", ");
    };

    const defineLocation = (location: string) => {
        if(location === "AMERICAN"){
            return "амер."
        }else {
            return "брит."
        }
    }
    let limitTranscriptions = (transcriptions: Array<ITranscription>) => {
        let result = []
        let amer = transcriptions.find(el => el.location === "AMERICAN")
        let brit = transcriptions.find(el => el.location === "BRITISH")
        if(amer){
            result.push(amer)
        }
        if(brit){
            result.push(brit)
        }
        return result
    }

    return (
        <>
            <div className={s.engWordContainer}>
                <div className={s.engWordComponent}>
                    <div className={s.engWord}>
                        {engWord && engWord.engWord}
                    </div>
                    <div className={s.transcriptionsBox}>
                        {engWord && limitTranscriptions(engWord.transcriptions).map(el =>
                            <div className={s.transcriptions} key={el.id}>
                                <div className={s.location}> {defineLocation (el.location)}</div>
                                <div className={s.transcriptionWord}>{el.transcription}</div>
                                <AudioComponent audioFile={el.audioFile}/>
                            </div>
                        )}
                    </div>
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
                            hasMoreMnemonics ={hasMoreMnemonics}
                        />
                    }
                </div>
                <br/>

                <div className={s.word}> примеры:</div>
                {examples.length === 0 && mnemonics.length === 0 &&
                    <div className={s.exampleNone}>
                        придумайте мнемонику, чтобы добавить пример
                    </div>
                }
                {engWord &&
                    <ExampleContainer
                        engWord={engWord}
                        mnemonics={mnemonics}
                        examples={examples}
                        updateExample={updateExample}
                        updateExamples = {updateExamples}
                        checkedExample={checkedExample}
                        isAuth={isAuth}
                        hasMoreExample ={hasMoreExample}
                    />
                }
            </div>
        </>
    )
};

export default EngWord