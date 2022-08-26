import React, {useEffect, useState} from "react";
import s from "./animation.module.scss";
import {ReactComponent as Brain} from "../../../import/icons/brain.svg";
import {ReactComponent as Repeat} from "../../../import/icons/repeat.svg";
import HighlightMnemonic from "../mnemonic/HighlightMnemonic";
import {ExampleFormat} from "../example/ExampleFormat";
import {useAppDispatch, useAppSelector} from "../../../store";
import {getExampleForHomePageAsync} from "../../../store/homePageSlice";
import {IExampleHome} from "../../../shared/models/engWordTypes";


export const Animation = () => {
    const {
        examplesHomePage,
        examples,
        hasMoreExamplesHome
    } = useAppSelector((state) => state.homePageReducer);

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getExampleForHomePageAsync(excludeIds))
        setTimeout(()=> setCounter(prev => prev - 1), 5000)
    }, [])


    useEffect(() => {
        if (examples.length > 0){
            setCurrentElement(examples[0])
            setExcludeIds([...excludeIds, ...examples.map(el => el.engWordId)])
            setIndex(0)
        }
    }, [examples])
    useEffect(() => {
        if(!hasMoreExamplesHome){
            setExcludeIds([])
        }
    }, [hasMoreExamplesHome])

    const [excludeIds, setExcludeIds] = useState<Array<number>>([])
    const [index, setIndex] = useState(0)
    const [currentElement, setCurrentElement] = useState<IExampleHome | null>(null)
    const [hide, setHide] = useState(false)
    const [counter, setCounter] = useState(1)

    const openMnemotechnic = (word: string, index: number) => {
        setHide(true)
        setTimeout(() => setHide(false), 200)
        setCounter(counter + 1)
        setTimeout(() => setCounter(prevState => prevState - 1), 5000)
        setIndex(index)
        setCurrentElement(examples[index])
    }
    const moreExamples = () => {
        dispatch(getExampleForHomePageAsync(excludeIds))
        setHide(true)
        setTimeout(() => setHide(false), 200)
        setCounter(counter + 1)
        setTimeout(() => setCounter(prevState => prevState - 1), 5000)
    }


    const brainStyle = counter > 0 ? s.iconBrainWithAnimation : s.iconBrain

    let engWordStyle = (i: number) => {
        let style = s.engWord
        if(i === index){
            style = s.engWord + " " + s.engWordBold
        }
        return style
    }
    return (
        <div className={s.animationContainer}>
            <div className={s.iconRepeat}
                 onClick={moreExamples}>
                <Repeat/>
            </div>
                <div className={s.elementsInLine}>
                    <div className={s.words}>
                        {examples
                            .map((w, index) =>
                                <div
                                    key={index}
                                    className={engWordStyle(index)}
                                     onClick={() => openMnemotechnic(w.engWord, index)}>
                                    <div>{w.engWord}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className={brainStyle}><Brain/></div>
                    <div className={s.mnemoTechnic}>
                        {currentElement && !hide &&
                            <>
                                <div className={s.mnemoTechnicElement1}>
                                    {currentElement.engWord} - {currentElement.translationInitForm}
                                </div>
                                <div className={s.mnemoTechnicElement2}>
                                    [{currentElement.transcription}]-[{currentElement.transliteration}]
                                </div>
                                <div className={s.mnemoTechnicElement3}>
                                    <HighlightMnemonic
                                        highlight={currentElement.highlight}
                                        mnemonic={currentElement.mnemonicInitForm}/>
                                </div>
                                <div className={s.mnemoTechnicElement4}>
                                    <ExampleFormat parts={currentElement.parts}/>
                                </div>
                            </>
                        }
                    </div>
                </div>
        </div>
    )
}