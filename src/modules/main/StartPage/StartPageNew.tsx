import React, {FC, useState} from 'react'
import s from './newStartPage.module.scss'
import {ReactComponent as Brain} from "../../../import/icons/brain.svg"
import {ReactComponent as Arrow} from "../../../import/icons/downarrow.svg"
import {ReactComponent as Letter1} from "../../../import/icons/ð.svg"
import {ReactComponent as Letter2} from "../../../import/icons/ɣ.svg"
import {ReactComponent as Letter3} from "../../../import/icons/α.svg"
import {ReactComponent as Letter4} from "../../../import/icons/β.svg"
import {ReactComponent as Letter5} from "../../../import/icons/δ.svg"
import {Animation} from "./Animation";
import {useAppSelector} from "../../../store";
import {useNavigate} from "react-router";

type StartPagePropsType = {
    isDarkTheme:boolean
}
export const StartPageNew: FC<StartPagePropsType> = (props) => {
    const {
        isAuth
    } = useAppSelector((state) => state.authReducer);
    const [instruction, setInstruction] = useState(false)
    const clickBrain = () => {
        setInstruction(true)
    }
    const navigate = useNavigate()
    const goToRegistration = () => {
        navigate("/login")
    }
    const goToPractice = () => {
        navigate("/practice")
    }
    return (
        <div className={s.startPage}>
            <div className={s.header}>Запоминай английские слова эффективно и надолго!</div>
            <div className={s.text}>Создай свой собственный словарь мнемонических ассоциаций</div>
            <div className={s.letter1}><Letter1/></div>
            <div className={s.letter2}><Letter2/></div>
            <div className={s.letter3}><Letter3/></div>
            <div className={s.letter4}><Letter4/></div>
            <div className={s.letter5}><Letter5/></div>
            {instruction ?
                <Animation/>
                :
                <div className={s.animationContainer}>
                    <div className={s.arrowBox}>
                        <div>как это работает?</div>
                        <div className={s.arrow}><Arrow/></div>
                    </div>
                    <div className={s.iconBrain} onClick={clickBrain}><Brain/></div>
                </div>
            }
                <div className={s.textToRegistration}>Тренируйся в запоминании английских слов с Mnemology</div>
            {isAuth ?
                <div className={s.buttonRegistration} onClick={goToPractice}>Тренироваться</div>
                :
                <div className={s.buttonRegistration} onClick={goToRegistration}>Регистрация</div>
            }

        </div>
    )
};