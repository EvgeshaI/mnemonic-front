import React, {FC, useState} from 'react'
import s from './startPage.module.scss'
import {ReactComponent as Logo} from "../../../import/icons/logo.svg"
import {ReactComponent as LogoDark} from "../../../import/icons/logoForDark.svg";
import {ReactComponent as GoBack} from "../../../import/icons/go-back.svg"
import {AnimatedTutorial} from "./AnimatedTutorial";

type StartPagePropsType = {
    theme:string
}
export const StartPage: FC<StartPagePropsType> = (props) => {
    const [slide, setSlide] = useState(false)
    const clickSlide = () => {
        setSlide(true)
    }
    let backStartPage = () => {
        setSlide(false)
    }
    return (
        <div className={s.startPage}>
            {!slide ?
                <div className={s.initText}>
                    <div className={s.h}>
                        {props.theme === "theme-light" ? <Logo/> : <LogoDark/>}
                    </div>
                    <div className={s.text}>
                        <div>Запоминать английские слова трудно, так как нашему мозгу не на что 'опереться'.</div>
                        <div>Новые буквы, непроизносимые звуки, а вместе, непонятные слова, которые никак не закрепляются в памяти.</div>
                        <div>Но что, если мы возьмём наш родной язык и сделаем его основой для закрепления английских слов?</div>

                        <div>Mnemology покажет, как это сделать!</div>
                    </div>
                    <div className={s.howBtn} onClick={clickSlide}>Как это работает?</div>
                </div>
                :
                <div className={s.carousel}>
                    <div className={s.h}><Logo/></div>
                    <div className={s.instruction}>
                        Для эффективного запоминания мы будем использовать <b style={{textDecoration:"underline"}}>мнемотехнику</b>. Смысл ее в том, чтобы
                        придумывать русские слова, в которых есть часть, созвучная английскому слову. Такие слова или фразы
                        мы будем называть <b style={{textDecoration:"underline"}}>мнемониками</b>.
                        Но запоминать английское слово нужно вместе с его переводом.
                        Поэтому от нас требуется еще одно творческое усилие - придумать предложение, в котором есть и мнемоника и перевод.
                        Собственный пример лучше всего запоминается, поэтому не стоит копировать чужой,
                        а вот мнемоники можно использовать любые.
                    </div>
                    <AnimatedTutorial/>
                    <div className={s.buttonBack}
                        onClick={backStartPage}>
                        <GoBack/>
                    </div>
                </div>

            }

        </div>
    )
};