import React, {useEffect, useState} from "react";
import s from "./animation.module.scss";
import {ReactComponent as Brain} from "../../../import/icons/brain.svg";
import HighlightMnemonic from "../mnemonic/HighlightMnemonic";
import {ExampleFormat} from "../example/ExampleFormat";


export const Animation = () => {
    let store = {
        mark : {
            word: "mark",
            transcription: "[mɑːk]",
            transliteration: "[марк]",
            mnemonic: {
                highlight: [0, 1, 2, 3],
                mnemo: "маркер"
            },
            translation: "отметка",
            parts: [
                {part: "сделать ", type: "PLAIN"},
                {part: "отметку", type: "TRANSLATION"},
                {part: " ", type: "PLAIN"},
                {part: "марк", type: "MNEMONIC"},
                {part: "ером", type: "PLAIN"}
            ]
        },
        leave : {
            word: "leave",
            transcription: "[liv]",
            transliteration: "[лив]",
            mnemonic: {
                highlight: [0, 1, 2],
                mnemo: "ливень"
            },
            translation: "оставлять",
            parts: [
                {part: "лив", type: "MNEMONIC"},
                {part: "ень ", type: "PLAIN"},
                {part: "оставил", type: "TRANSLATION"},
                {part: " глубокие лужи", type: "PLAIN"},
            ]
        },
        steal : {
            word: "steal",
            transcription: "[stil]",
            transliteration: "[стил]",
            mnemonic: {
                highlight: [0, 1, 2, 3],
                mnemo: "стиль"
            },
            translation: "украсть",
            parts: [
                {part: "он ", type: "PLAIN"},
                {part: "украл", type: "TRANSLATION"},
                {part: " чужой ", type: "PLAIN"},
                {part: "стил", type: "MNEMONIC"},
                {part: "ь", type: "PLAIN"}
            ]
        }
    }
    const [engWord, setEngWord] = useState("mark")
    const [hide, setHide] = useState(false)
    const [counter, setCounter] = useState(1)

    // @ts-ignore
    const currentEngWord = store[engWord]
    const openMnemotechnic = (word: string) => {
        setHide(true)
        setEngWord(word)
        setTimeout(() => setHide(false), 200)
        setCounter(counter + 1)
        setTimeout(()=> setCounter(prevState => prevState - 1), 5000)
    }
    useEffect(() => {
        setTimeout(()=> setCounter(prev => prev - 1), 5000)
    }, [])

    const brainStyle = counter > 0 ? s.iconBrainWithAnimation : s.iconBrain

    let engWordStyle = (key: string) => {
        let style = s.engWord
        if(key === engWord){
            style = s.engWord + " " + s.engWordBold
        }
        return style
    }
    return (
        <div className={s.animationContainer}>
            <div className={s.elementsInLine}>
                <div className={s.words}>
                    {Object.keys(store)
                        .map(w =>
                            <div className={engWordStyle(w)} onClick={() => openMnemotechnic(w)}>{w}</div>
                        )
                    }
                </div>
                <div className={brainStyle}><Brain/></div>
                <div className={s.mnemoTechnic}>
                    {engWord.length > 0 && !hide &&
                        <>
                            <div className={s.mnemoTechnicElement1}>
                                {currentEngWord.word} - {currentEngWord.translation}
                            </div>
                            <div className={s.mnemoTechnicElement2}>
                                {currentEngWord.transcription}-{currentEngWord.transliteration}
                            </div>
                            <div className={s.mnemoTechnicElement3}>
                                <HighlightMnemonic highlight={currentEngWord.mnemonic.highlight} mnemonic={currentEngWord.mnemonic.mnemo}/>
                            </div>
                            <div className={s.mnemoTechnicElement4}>
                                <ExampleFormat parts={currentEngWord.parts}/>
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}