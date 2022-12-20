import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import {getEngWordAsync} from "../../../store/engWordSlice";
import s from './EngWord.module.scss'
import {useParams} from "react-router-dom";
import {ITranscription, ITranslation} from "../../../shared/models/engWordTypes";
import MnemonicContainer from "../mnemonic/MnemonicContainer";
import ExampleContainer from "../example/ExampleContainer";
import {AudioComponent} from "./AudioComponent";
import {resetMnemonic} from "../../../store/mnemonicSlice";
import {resetExample} from "../../../store/exampleSlice";
import {Preloader} from "../Preloader/Preloader";
import {ReactComponent as ArrowDown} from "../../../import/icons/arrow1.svg";
import {ReactComponent as ArrowUp} from "../../../import/icons/arrow2.svg";
import {Transliterations} from "./Transliterations";
import {Consonance} from "../consonance/Consonance";

const EngWord: FC<any> = () => {
    const dispatch = useAppDispatch();
    const {
        engWord,
    } = useAppSelector((state) => state.engWordReducer);
    const {
        mnemonics
    } = useAppSelector((state) => state.mnemonicReducer);
    const hasMoreMnemonics = useAppSelector((state) => state.mnemonicReducer).hasMore
    const {
        examples,
        checkedExample,
        updateExamples
    } = useAppSelector((state) => state.exampleReducer);
    const hasMoreExample = useAppSelector((state) => state.exampleReducer).hasMore;
    const {
        isAuth
    } = useAppSelector((state) => state.authReducer);
    const {
        isFetching
    } = useAppSelector((state) => state.appReducer);

    let params = useParams();
    let urlWord = params.word || "";

    useEffect(() => {
        if (urlWord.length > 0) {
            dispatch(getEngWordAsync(urlWord))
        }
        return () => {
            dispatch(resetMnemonic())
            dispatch(resetExample())
        }
    }, [urlWord]);


    const translationsIcon = () => {
        return !trans ? <ArrowUp/> : <ArrowDown/>
    }
    const [trans, setTrans] = useState(true)
    const [amountOfTrans, setAmountOfTrans] = useState(4)
    const [showContent, setShowContent] = useState(true)
    let joinTranslation = (translations: Array<ITranslation>) => {
        return translations.filter((el, i) => i < amountOfTrans).map(t => t.translation).join(", ");
    };
    const clickTransIcon = () => {
        const prev = trans
        setTrans(!prev)
        if(prev){
            setAmountOfTrans(20)
        }else {
            setAmountOfTrans(4)
        }
    }
    const defineLocation = (location: string) => {
        if(location === "AMERICAN"){
            return "амер."
        }else {
            return "брит."
        }
    }

    let limitTranscriptions = (transcriptions: Array<ITranscription>) => {
        let result = []
        let americanArr = transcriptions.filter(el => el.location === "AMERICAN")
            .sort((a,b) => b.transliterations.length - a.transliterations.length)
        let britishArr = transcriptions.filter(el => el.location === "BRITISH")
            .sort((a,b) => b.transliterations.length - a.transliterations.length)
        let amer = americanArr ? americanArr[0] : null
        let brit = britishArr ? britishArr[0] : null
        if(amer){
            result.push(amer)
        }
        if(brit){
            result.push(brit)
        }
        return result
    }
    const transliterations = engWord?.transcriptions.flatMap(el => el.transliterations)
    return (
        <>
            {isFetching
                ?
                <Preloader/>
                :
                <div className={s.engWordContainer}>
                    <div className={s.engWordComponent}>
                        <div className={s.engWord}>
                            {engWord && engWord.engWord}
                        </div>
                        <div className={s.transcriptionsBox}>
                            {engWord && limitTranscriptions(engWord.transcriptions).map(el =>
                                <div className={s.transcriptions} key={el.id}>
                                    <div className={s.transcriptionsContainer}>
                                        <div className={s.location}> {defineLocation(el.location)}</div>
                                        <div style={{position: 'relative'}}>
                                            <div className={s.transcriptionWord}>{el.transcription}</div>
                                            <Transliterations transliterations={el.transliterations}/>
                                        </div>
                                        <AudioComponent audioFile={el.audioFile}/>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div className={s.translate}>
                            {engWord &&
                                <>
                                    <span className={s.translateWord}>{joinTranslation(engWord.translations)}</span>
                                    {engWord!.translations.length > 4 &&
                                        <span
                                            onClick={() => clickTransIcon()}
                                            className={s.transIcon}>
                                            {translationsIcon()}
                                        </span>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className={s.tabsBlock}>
                        <div className={showContent ? s.tabStyleActive : s.tabStyle}
                             onClick={() => setShowContent(true)}>
                            мнемоники и примеры
                        </div>
                        <div className={showContent ? s.tabStyle : s.tabStyleActive}
                             onClick={() => setShowContent(false)}>
                            поиск созвучий
                        </div>
                    </div>
                    {showContent &&
                        <div>
                            <div className={s.word}> мнемоники:</div>
                            <div>
                                {engWord &&
                                    <MnemonicContainer
                                        engWord={engWord}
                                        mnemonics={mnemonics}
                                        isAuth={isAuth}
                                        hasMoreMnemonics={hasMoreMnemonics}
                                    />
                                }
                            </div>
                            <br/>
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
                                    // updateExample={updateExample}
                                    updateExamples={updateExamples}
                                    checkedExample={checkedExample}
                                    isAuth={isAuth}
                                    hasMoreExample={hasMoreExample}
                                />

                            }
                        </div>
                    }
                </div>
            }
            {!showContent &&
                <Consonance locationContent={null} transliterations={transliterations}/>
            }
        </>
    )
};

export default EngWord