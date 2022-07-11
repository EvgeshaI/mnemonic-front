import React, {FC, useState} from 'react'
import s from './startPage.module.css'
import {ReactComponent as Logo} from "../../../import/icons/logo.svg"
import {AnimatedTutorial} from "./AnimatedTutorial";

export const StartPage: FC = () => {
    const [slide, setSlide] = useState(false)
    const clickSlide = () => {
        setSlide(true)
    }
    return (
        <div className={s.startPage}>
            {!slide ?
                <div className={s.initText}>
                    <div className={s.h}><Logo/></div>
                    <div className={s.text}> Мнемотехника - это оригинальный способ запоминания нужной информации.
                        <div>Выучить английские слова гораздо легче, если они ассоциируются с конкретными
                            образами.</div>
                        Mnemology поможет тебе в этом!
                    </div>
                    <div className={s.howBtn} onClick={clickSlide}>Как это работает?</div>
                </div>
                :
                <div className={s.carousel}>
                    <div className={s.h}><Logo/></div>
                    <div className={s.instruction}>
                        Для эффективного запоминания используется мнемотехника
                        подбора русских слов, в которых есть часть, созвучная английскому слову.
                        Но так как это слово не всегда будет являться переводом, небходимо связать в одном предложении и мнемонику и перевод.
                        Вы можете использовать уже добавленные на сайте мнемоники, но лучше придумать свои!
                    </div>
                    <AnimatedTutorial/>
                </div>
            }
        </div>
    )
};