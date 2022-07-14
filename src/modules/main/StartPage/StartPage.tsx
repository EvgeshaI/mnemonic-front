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
                    <div className={s.text}>
                        <div>Запоминать английские слова трудно, так как нашему мозгу не на что 'опереться'</div>
                        <div>Новые буквы, непроизносимые звуки, а вместе непонятные слова, которые никак не закрепляются в памяти</div>
                        <div>Но что если мы возьмём наш родной язык и сделаем его основой для закрепления английских слов?</div>
                        <br/>
                        <div>Mnemology покажет, как это сделать</div>
                    </div>
                    <div className={s.howBtn} onClick={clickSlide}>Как это работает?</div>
                </div>
                :
                <div className={s.carousel}>
                    <div className={s.h}><Logo/></div>
                    <div className={s.instruction}>
                        Для эффективного запоминания мы будем использовать мнемотехнику. Смысл ее в том, чтобы
                        придумывать русские слова, в которых есть часть, созвучная английскому слову. Такие слова или фразы
                        мы будем называть мнемониками.
                        Но запоминать английское слово нужно вместе с его переводом.
                        Поэтому от нас требуется еще одно творческое усилие - придумать предложение, в котором есть и мнемоника и перевод.
                        Собственный пример лучше всего запоминается, поэтому не стоит копировать чужой,
                        а вот мнемоники можно использовать любые.
                    </div>
                    <AnimatedTutorial/>
                </div>
            }
        </div>
    )
};