import React, {FC, useEffect, useState} from "react";
import {useAppDispatch} from "../../../store";
import {ReactComponent as Key} from "../../../import/icons/key.svg";
import {getPracticeAsync, guessedAsync, tookHintAsync} from "../../../store/practiceSlice";
import s from "./practice.module.scss"
import {ReactComponent as Question} from "../../../import/icons/question.svg";
import {Sentence} from "./Sentence";
import {FinishComponent} from "./FinishComponent";
import {ProgressBar} from "./ProgressBar";
import useWindowDimensions from "../../util/windowDimensions";
import {IconsResult} from "./IconsResult";
import {IPracticeExample} from "../../../shared/models/engWordTypes";

export const Practice:FC<{practices: Array<IPracticeExample>}> = (props) => {

    const dispatch = useAppDispatch()

    const [count, setCount] = useState(8)
    const [engWord, setEngWord] = useState("")
    const [translate, setTranslate] = useState("")
    const [engWordCorrect, setEngWordCorrect] = useState(false)
    const [translateCorrect, setTranslateCorrect] = useState(false)
    const [checkedCount, setCheckedCount] = useState(0)
    const [checked, setChecked] = useState(false)
    const [instruction, setInstruction] = useState(false)
    const [keyCount, setKeyCount] = useState(2)
    const [rightCount, setRightCount] = useState(0)

    useEffect(() => {
        dispatch(getPracticeAsync())
    }, [])

    const changeEngWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEngWord(e.target.value)
        resetAllFlags()
    }
    const changeTranslate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTranslate(e.target.value)
        resetAllFlags()
    }
    const nextSentence = () => {
        setCount(count+1)
        resetAll()
        setCheckedCount(0)
        if(engWordCorrect && translateCorrect){
            setRightCount(rightCount+1)
        }
    }
    const resetAll = () => {
        setEngWord("")
        setTranslate("")
        resetAllFlags()
    }
    const resetAllFlags = () => {
        setEngWordCorrect(false)
        setTranslateCorrect(false)
        setChecked(false)
    }
    const examplesPractice = props.practices
    const currentExample = examplesPractice[count]

    const check = () => {
        if (engWord.length === 0 || translate.length === 0) return
        if(engWord === currentExample.engWord || engWord.trim().toLowerCase() === currentExample.engWord){
            setEngWordCorrect(true)
        }
        const translationLower = translate.trim().toLowerCase();
        if(translationLower === currentExample.translationInSentence.toLowerCase()
            ||translationLower === currentExample.translationInitForm.toLowerCase()){
            setTranslate(currentExample.translationInitForm)
            setTranslateCorrect(true)
        }
        setChecked(true)
        setCheckedCount(checkedCount + 1)
    }
    const correctAnswer = () => {
        setEngWord(currentExample.engWord)
        setTranslate(currentExample.translationInSentence)
        setEngWordCorrect(true)
        setTranslateCorrect(true)
        setCheckedCount(checkedCount + 1)
        setRightCount(rightCount-1)
    }

    const wrongEngWord = () => checked && !engWordCorrect

    const wrongTranslation = () => checked && !translateCorrect

    useEffect(() => {
        if(wrongEngWord() || wrongTranslation()){
            dispatch(guessedAsync(currentExample.exampleId, false))
        }
        if(engWordCorrect && translateCorrect){
            dispatch(guessedAsync(currentExample.exampleId, true))
        }
    }, [checked])

    useEffect(() => {
        setKeyCount(2)
        setCheckedCount(0)
    }, [count])

    const getKey = () => {
        if(keyCount<1){
            setKeyCount(0)
        }else{
            setKeyCount(keyCount-1)
            dispatch(tookHintAsync(currentExample.exampleId))
        }
    }
    const { width } = useWindowDimensions();
    const isMobileScreen = width < 600

    const engWordStyle = () => {
        let style = s.inputPractice
        if (wrongEngWord()) {
            style += ' ' + s.inputPracticeError
        } else if (engWordCorrect) {
            style += ' ' + s.inputPracticeCorrect
        }
        return style
    }
    const translationStyle = () => {
        let style = s.inputPractice
        if (wrongTranslation()) {
            style += ' ' + s.inputPracticeError
        } else if (translateCorrect) {
            style += ' ' + s.inputPracticeCorrect
        }
        return style
    }
    let progressLine = () => {
        if (examplesPractice) {
            return (100/examplesPractice.length) * count
        }
        return 0
    }

    return (
        <div className={s.practiceContainer}>
            {count <= examplesPractice.length - 1 &&
                <ProgressBar width={progressLine()}/>
            }
            <div className={s.headerBox}>
                <div className={s.practiceHead}>Тренировка</div>
                <div onClick={() => setInstruction(!instruction)}
                     className={s.instructionIcon}>
                    <Question/>
                </div>
            </div>
            <div className={s.instructionBox}>
                {instruction &&
                    <div className={s.instruction}>
                        По своим примерам вспомните английское слово и его перевод.
                        На один пример у вас две попытки и две подсказки. Удачи!
                    </div>
                }
            </div>
            {count <= examplesPractice.length - 1 ?
                <div className={s.practiceBox}>
                    <div className={s.sentenceBox}>
                        <div className={s.sentence}>
                            <Sentence
                                currentExample={currentExample}
                                count={keyCount}
                            />
                        </div>
                        <div className={s.keyBox}>
                            <div
                                onClick={getKey}
                                className={s.keyIcon}>
                                <Key/>
                            </div>
                            <div className={s.count}>{keyCount}</div>
                        </div>
                    </div>

                    <div className={s.inputContainer}>
                        <div className={s.inputBox}>
                            <div className={s.inputName}>слово</div>
                            <input
                                onBlur={() => {
                                }}
                                value={engWord}
                                onChange={changeEngWord}
                                className={engWordStyle()}/>
                        </div>
                        {!isMobileScreen &&
                            <IconsResult
                                wrongEngWord={wrongEngWord()}
                                wrongTranslation={wrongTranslation()}
                                checkedCount={checkedCount}
                                engWordCorrect={engWordCorrect}
                                translateCorrect={translateCorrect}
                            />
                        }
                        <div className={s.inputBox}>
                            <div className={s.inputName}>перевод</div>
                            <input
                                value={translate}
                                onChange={changeTranslate}
                                className={translationStyle()}/>
                        </div>
                    </div>
                    {(checkedCount < 2 && (!engWordCorrect || !translateCorrect)) &&
                        <div className={s.practiceButton} onClick={check}>Проверить</div>
                    }
                    {((!engWordCorrect || !translateCorrect) && checkedCount > 1) &&
                        <div className={s.practiceButton} onClick={correctAnswer}>ответ</div>
                    }
                    {((engWordCorrect && translateCorrect) || checkedCount > 2) &&
                        <div className={s.practiceButton} onClick={nextSentence}>Далее</div>
                    }
                    {isMobileScreen &&
                        <IconsResult
                            wrongEngWord={wrongEngWord()}
                            wrongTranslation={wrongTranslation()}
                            checkedCount={checkedCount}
                            engWordCorrect={engWordCorrect}
                            translateCorrect={translateCorrect}
                        />
                    }
                </div>
                :
                <FinishComponent
                    setCount={setCount}
                    setRightCount={setRightCount}
                    allPractice={examplesPractice.length}
                    rightCount={rightCount}/>
            }
        </div>
    )
}