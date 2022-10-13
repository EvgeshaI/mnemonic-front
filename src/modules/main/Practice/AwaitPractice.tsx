import React, {FC} from "react";
import {IAwait} from "../../../shared/models/engWordTypes";
import {AwaitingPart} from "./AwaitingPart";
import s from "./awaiting.module.scss"
import {ReactComponent as Confetti} from "../../../import/icons/confetti.svg";
import {ReactComponent as Book} from "../../../import/icons/book.svg";
import {useNavigate} from "react-router";

type AwaitPracticePropsType = {
    awaitingPractice: Array<IAwait>
}

export const AwaitPractice: FC<AwaitPracticePropsType> = (props) => {
    const navigate = useNavigate()
    const backToMyPage = () => {
        navigate(`/user`)
    }
    return (
        <div className={s.awaitContainer}>
            Поздравляем! Вы успешно повторили все слова!
            <div className={s.confetti}><Confetti/></div>
            <div className={s.text}>
                увидимcя на следующей тренировке!
            </div>
           <div className={s.awaitPractice}>
               <div className={s.columnName}>
                   <div>примеры</div>
                   <div>будут доступны</div>
               </div>
               {props.awaitingPractice.map((el, i) => <AwaitingPart
                                                index={i}
                                                key={i}
                                                sentence={el.sentence}
                                                waitTill={el.waitTill}
                                                />)
                }
           </div>
            <div className={s.buttonMyPge} onClick={backToMyPage}>
                <div className={s.iconBook}><Book/></div>
                <div>мой словарь</div>
            </div>
        </div>
    )
}